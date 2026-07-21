<?php

beforeEach(function () {
    config(['app.deploy_token' => 'secret-token']);
});

test('deploy hook rejects requests without a valid token', function () {
    $this->get(route('deploy.hook'))
        ->assertForbidden();

    $this->get(route('deploy.hook', ['token' => 'wrong']))
        ->assertForbidden();
});

test('deploy hook is disabled when no token is configured', function () {
    config(['app.deploy_token' => '']);

    $this->get(route('deploy.hook', ['token' => '']))
        ->assertForbidden();
});

test('deploy hook runs artisan commands with a valid token', function () {
    $this->get(route('deploy.hook', ['token' => 'secret-token']))
        ->assertOk()
        ->assertJsonStructure([
            'status',
            'results' => [
                'migrate --force',
                'config:clear',
                'route:clear',
                'view:clear',
                'cache:clear',
                'storage:link',
            ],
        ]);
});
