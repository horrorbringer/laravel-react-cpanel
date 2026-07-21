<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    public function toggle(Post $post, Request $request): RedirectResponse
    {
        $user = $request->user();

        $bookmark = $post->bookmarks()->where('user_id', $user->id)->first();

        if ($bookmark) {
            $bookmark->delete();
        } else {
            $post->bookmarks()->create(['user_id' => $user->id]);
        }

        return back();
    }
}
