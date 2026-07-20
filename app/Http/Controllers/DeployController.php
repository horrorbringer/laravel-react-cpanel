<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class DeployController extends Controller
{
    public function run(Request $request)
    {
        $token = (string) config('app.deploy_token');

        if ($token === '' || $request->query('token') !== $token) {
            abort(403);
        }

        // Order matters: migrate first so tables (cache, sessions, etc.)
        // exist before any cache-clearing command touches them.
        $commands = [
            'migrate --force' => ['migrate', ['--force' => true]],
            'config:clear' => ['config:clear', []],
            'route:clear' => ['route:clear', []],
            'view:clear' => ['view:clear', []],
            'cache:clear' => ['cache:clear', []],
            'storage:link' => ['storage:link', []],
        ];

        // Commands that may legitimately fail on a fresh DB (table not yet
        // created) should not mark the whole deploy as failed.
        $nonCritical = ['cache:clear'];

        $results = [];
        $failed = false;

        foreach ($commands as $label => [$command, $args]) {
            try {
                $code = Artisan::call($command, $args);
                $results[$label] = [
                    'code' => $code,
                    'output' => Artisan::output(),
                ];
            } catch (\Throwable $e) {
                $results[$label] = [
                    'code' => 1,
                    'error' => $e->getMessage(),
                ];

                if (! in_array($label, $nonCritical, true)) {
                    $failed = true;
                }
            }
        }

        return response()->json([
            'status' => $failed ? 'error' : 'ok',
            'results' => $results,
        ], $failed ? 500 : 200);
    }
}
