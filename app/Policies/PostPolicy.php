<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Posts are managed by their owner.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Published posts are publicly viewable; drafts only by their owner.
     */
    public function view(User $user, Post $post): bool
    {
        return $post->published || $post->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Post $post): bool
    {
        return $post->user_id === $user->id;
    }

    public function delete(User $user, Post $post): bool
    {
        return $post->user_id === $user->id;
    }
}
