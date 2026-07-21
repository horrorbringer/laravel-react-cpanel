<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Post $post, Request $request): RedirectResponse
    {
        $data = $request->validate([
            'body' => ['required', 'string', 'max:10000'],
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $data['body'],
        ]);

        return back();
    }

    public function destroy(Comment $comment, Request $request): RedirectResponse
    {
        abort_if($comment->user_id !== $request->user()->id, 403);

        $comment->delete();

        return back();
    }
}
