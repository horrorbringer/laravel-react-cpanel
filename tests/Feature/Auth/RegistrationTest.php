<?php

use App\Models\Post;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'Password123!@#',
        'password_confirmation' => 'Password123!@#',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect('/posts');
});

test('registration seeds sample posts for the new user', function () {
    $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'Password123!@#',
        'password_confirmation' => 'Password123!@#',
    ]);

    expect(Post::count())->toBeGreaterThanOrEqual(3);
    expect(Post::where('published', true)->count())->toBeGreaterThanOrEqual(2);
});
