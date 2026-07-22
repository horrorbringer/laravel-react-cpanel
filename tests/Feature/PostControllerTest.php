<?php

use App\Models\Post;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests are redirected from the posts index', function () {
    $this->get(route('posts.index'))->assertRedirect(route('login'));
});

test('authenticated users can list their own posts', function () {
    Post::factory()->count(3)->for($this->user)->create();

    $this->actingAs($this->user)
        ->get(route('posts.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('posts/index')
            ->has('posts.data', 3));
});

test('authenticated users only see posts they own', function () {
    Post::factory()->count(2)->for($this->user)->create();
    Post::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get(route('posts.index'))
        ->assertInertia(fn ($page) => $page->has('posts.data', 2));
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
        'user_id' => $this->user->id,
    ]);
});

test('post content stores editor HTML unmodified', function () {
    $html = '<h2>Heading</h2><p>Some <strong>bold</strong> text</p>';

    $this->actingAs($this->user)
        ->post(route('posts.store'), [
            'title' => 'Rich content post',
            'content' => $html,
            'published' => false,
        ]);

    expect(Post::where('title', 'Rich content post')->first()->content)
        ->toBe($html);
});

test('post validation requires a title and content', function () {
    $this->actingAs($this->user)
        ->post(route('posts.store'), [])
        ->assertSessionHasErrors(['title', 'content']);
});

test('owner can update their post', function () {
    $post = Post::factory()->for($this->user)->create();

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

test('users cannot update posts they do not own', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->put(route('posts.update', $post), [
            'title' => 'Hijacked',
            'content' => 'Nope',
        ])
        ->assertForbidden();
});

test('owner can delete their post', function () {
    $post = Post::factory()->for($this->user)->create();

    $this->actingAs($this->user)
        ->delete(route('posts.destroy', $post))
        ->assertRedirect(route('posts.index'));

    $this->assertDatabaseMissing('posts', ['id' => $post->id]);
});

test('users cannot delete posts they do not own', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->delete(route('posts.destroy', $post))
        ->assertForbidden();
});

test('autosave accepts a standalone JSON request and returns the draft id', function () {
    $this->actingAs($this->user)
        ->postJson(route('posts.autosave'), [
            'title' => 'Half written',
            'content' => '<p>Draft…</p>',
        ])
        ->assertCreated()
        ->assertJsonStructure(['id']);

    $this->assertDatabaseHas('posts', [
        'title' => 'Half written',
        'published' => false,
        'user_id' => $this->user->id,
    ]);
});

test('autosave tolerates an empty payload', function () {
    $this->actingAs($this->user)
        ->post(route('posts.autosave'), [])
        ->assertCreated();
});

test('owners can autosave an update to their draft', function () {
    $post = Post::factory()->for($this->user)->create();

    $this->actingAs($this->user)
        ->put(route('posts.autosave.update', $post), [
            'title' => 'Updated draft',
        ])
        ->assertOk()
        ->assertJson(['id' => $post->id]);

    $this->assertDatabaseHas('posts', [
        'id' => $post->id,
        'title' => 'Updated draft',
        'published' => false,
    ]);
});

test('users cannot autosave over a post they do not own', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->put(route('posts.autosave.update', $post), [
            'title' => 'Hijack',
        ])
        ->assertForbidden();
});

test('visiting a missing post shows the not found page', function () {
    $this->get('/posts/999999')
        ->assertNotFound()
        ->assertInertia(fn ($page) => $page->component('errors/not-found'));
});
