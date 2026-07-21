<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard/index', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalPosts' => Post::count(),
                'totalComments' => Comment::count(),
                'totalLikes' => Like::count(),
            ],
        ]);
    }
}
