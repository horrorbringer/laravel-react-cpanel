<?php

use App\Models\User;

test('administrators can visit every admin navigation destination', function (string $routeName, string $component): void {
    $administrator = User::factory()->create(['is_admin' => true]);

    $this->actingAs($administrator)
        ->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component($component));
})->with([
    'dashboard' => ['admin.dashboard', 'admin/dashboard/index'],
    'users' => ['admin.users.index', 'admin/users/index'],
    'posts' => ['admin.posts.index', 'admin/posts/index'],
]);

test('non-administrators cannot visit admin navigation destinations', function (string $routeName): void {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertForbidden();
})->with([
    'dashboard' => ['admin.dashboard'],
    'users' => ['admin.users.index'],
    'posts' => ['admin.posts.index'],
]);
