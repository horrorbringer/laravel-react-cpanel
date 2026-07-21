<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = Post::query()
            ->where('user_id', $request->user()->id)
            ->when($request->str('search')->trim(), function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->with('user')
            ->withCount(['likes', 'comments', 'bookmarks'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('posts/index', [
            'posts' => $posts,
            'filters' => ['search' => $request->str('search')->trim()],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(PostRequest $request)
    {
        $request->user()->posts()->create($request->validated());

        return to_route('posts.index');
    }

    public function show(Post $post, Request $request): Response
    {
        abort_unless($post->published, 404);

        $post->load('user', 'comments.user', 'likes');

        $post->incrementViews();

        $user = $request->user();

        return Inertia::render('posts/show', [
            'post' => $this->toArticle($post),
            'engagement' => [
                'views' => $post->views,
                'likes_count' => $post->likes->count(),
                'is_liked' => $user ? $post->isLikedBy($user) : false,
                'is_bookmarked' => $user ? $post->isBookmarkedBy($user) : false,
            ],
            'comments' => $post->comments->map(fn ($comment) => [
                'id' => $comment->id,
                'body' => $comment->body,
                'author' => $comment->user?->name ?? 'Anonymous',
                'created_at' => $comment->created_at?->diffForHumans(),
                'is_owner' => $user && $comment->user_id === $user->id,
            ]),
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
            'author' => $post->user?->name ?? 'Author',
            'readingTime' => $minutes.' min read',
            'created_at' => $post->created_at?->toISOString(),
        ];
    }

    public function edit(Post $post): Response
    {
        $this->authorize('update', $post);

        return Inertia::render('posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(PostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $post->update($request->validated());

        return to_route('posts.index');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();

        return to_route('posts.index');
    }

    /**
     * Silently create a draft as the user types. Tolerant validation:
     * title and content are optional, and the post is never published.
     */
    public function autosaveStore(Request $request)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
        ]);

        $data['published'] = false;

        $post = $request->user()->posts()->create($data);

        return response()->json(['id' => $post->id], 201);
    }

    /**
     * Silently update an existing draft as the user types.
     */
    public function autosaveUpdate(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
        ]);

        $data['published'] = false;

        $post->update($data);

        return response()->json(['id' => $post->id]);
    }
}
