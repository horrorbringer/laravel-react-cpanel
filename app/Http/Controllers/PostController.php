<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::latest()->paginate(10);

        return Inertia::render('posts/index', [
            'posts' => $posts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(PostRequest $request)
    {
        Post::create($request->validated());

        return to_route('posts.index');
    }

    public function show(Post $post): Response
    {
        abort_unless($post->published, 404);

        return Inertia::render('posts/show', [
            'post' => $this->toArticle($post),
        ]);
    }

    private function toArticle(Post $post): array
    {
        $words = str_word_count(strip_tags((string) $post->content)) ?: 0;
        $minutes = max(1, (int) ceil($words / 200));

        return [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'published' => $post->published,
            'author' => 'Author',
            'readingTime' => $minutes.' min read',
            'created_at' => $post->created_at?->toISOString(),
        ];
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(PostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return to_route('posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return to_route('posts.index');
    }
}
