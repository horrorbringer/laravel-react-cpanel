<?php

use App\Models\Post;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests are redirected from the posts index', function () {
    $this->get(route('posts.index'))->assertRedirect(route('login'));
});

test('authenticated users can list posts', function () {
    $posts = Post::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get(route('posts.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('posts/index')
            ->has('posts.data', 3));
});

test('authenticated users can create a post', function () {
    $this->actingAs($this->user)
        ->post(route('posts.store'), [
            'title' => 'My first post',
            'content' => 'Hello world',
            'published' => true,
        ])
        ->assertRedirect(route('posts.index'));

    $this->assertDatabaseHas('posts', [
        'title' => 'My first post',
        'published' => true,
    ]);
});

test('post validation requires a title and content', function () {
    $this->actingAs($this->user)
        ->post(route('posts.store'), [])
        ->assertSessionHasErrors(['title', 'content']);
});

test('authenticated users can update a post', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->put(route('posts.update', $post), [
            'title' => 'Updated title',
            'content' => 'Updated content',
            'published' => false,
        ])
        ->assertRedirect(route('posts.index'));

    $this->assertDatabaseHas('posts', [
        'id' => $post->id,
        'title' => 'Updated title',
    ]);
});

test('authenticated users can delete a post', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->delete(route('posts.destroy', $post))
        ->assertRedirect(route('posts.index'));

    $this->assertDatabaseMissing('posts', ['id' => $post->id]);
});
