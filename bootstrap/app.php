<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        then: function () {
            require __DIR__.'/../routes/admin.php';
        },
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias(['admin' => AdminMiddleware::class]);

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        // Render friendly Inertia error pages instead of blank/bare responses,
        // e.g. when a post or other resource no longer exists.
        $exceptions->renderable(function (NotFoundHttpException $e, Request $request) {
            if (! $request->expectsJson() && ! $request->is('api/*')) {
                return Inertia::render('errors/not-found', [
                    'status' => 404,
                    'message' => 'The page or resource you are looking for could not be found.',
                ])->toResponse($request)->setStatusCode(404);
            }
        });

        $exceptions->renderable(function (ModelNotFoundException $e, Request $request) {
            if (! $request->expectsJson() && ! $request->is('api/*')) {
                return Inertia::render('errors/not-found', [
                    'status' => 404,
                    'message' => 'The resource you are looking for no longer exists.',
                ])->toResponse($request)->setStatusCode(404);
            }
        });

        $exceptions->renderable(function (AccessDeniedHttpException $e, Request $request) {
            if (! $request->expectsJson() && ! $request->is('api/*')) {
                return Inertia::render('errors/not-found', [
                    'status' => 403,
                    'message' => 'You do not have permission to view this resource.',
                ])->toResponse($request)->setStatusCode(403);
            }
        });
    })->create();
