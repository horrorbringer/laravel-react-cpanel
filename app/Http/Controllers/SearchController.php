<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $search = $request->str('q')->trim();

        $posts = Post::query()
            ->where('published', true)
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->with('user')
            ->latest()
            ->get();

        $articles = $posts->map(function (Post $post) {
            $excerpt = Str::words(
                strip_tags((string) $post->content),
                40,
                '…',
            );

            return [
                'id' => $post->id,
                'title' => $post->title,
                'excerpt' => $excerpt,
                'author' => $post->user?->name ?? 'Author',
                'date' => $post->created_at?->format('M j') ?? '',
                'readingTime' => $this->readingTime((string) $post->content),
            ];
        });

        return Inertia::render('search', [
            'articles' => $articles,
            'query' => $search,
        ]);
    }

    private function readingTime(string $content): string
    {
        $words = str_word_count(strip_tags($content)) ?: 0;
        $minutes = max(1, (int) ceil($words / 200));

        return $minutes.' min read';
    }
}
