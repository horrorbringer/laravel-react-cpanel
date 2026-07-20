<?php

use App\Models\Post;

test('home page loads published posts from the database', function () {
    Post::factory()->count(3)->create(['published' => true]);
    Post::factory()->create(['published' => false]);

    $response = $this->get(route('home'));

    $response->assertOk();

    $articles = null;
    $response->assertInertia(function ($page) use (&$articles) {
        $page->component('welcome')->has('articles', 3);
        $articles = $page->toArray()['props']['articles'];

        return true;
    });

    expect($articles)->toHaveCount(3);

    $titles = collect($articles)->pluck('title')->all();
    foreach (Post::where('published', true)->pluck('title') as $title) {
        expect($titles)->toContain($title);
    }

    foreach ($articles as $article) {
        expect($article)->toHaveKeys([
            'id',
            'title',
            'excerpt',
            'author',
            'date',
            'readingTime',
            'tag',
        ]);
    }
});

test('home page shows no posts when none are published', function () {
    Post::factory()->create(['published' => false]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('articles', []));
});

test('published posts are publicly viewable on the show page', function () {
    $post = Post::factory()->create(['published' => true]);

    $this->get(route('posts.show', $post))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('posts/show')
            ->where('post.id', $post->id));
});

test('unpublished posts return 404 on the show page', function () {
    $post = Post::factory()->create(['published' => false]);

    $this->get(route('posts.show', $post))->assertNotFound();
});
