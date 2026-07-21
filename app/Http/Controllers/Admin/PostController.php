<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = Post::query()
            ->with('user:id,name')
            ->withCount(['likes', 'comments', 'bookmarks'])
            ->when($request->str('search')->trim(), function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
            'filters' => ['search' => $request->str('search')->trim()],
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);

        Post::whereIn('id', $ids)->delete();

        return back();
    }

    public function destroy(Request $request, Post $post)
    {
        $post->delete();

        return back();
    }
}
