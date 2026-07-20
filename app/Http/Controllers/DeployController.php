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

        $commands = [
            'migrate --force' => ['migrate', ['--force' => true]],
            'config:clear' => ['config:clear', []],
            'route:clear' => ['route:clear', []],
            'view:clear' => ['view:clear', []],
            'cache:clear' => ['cache:clear', []],
            'storage:link' => ['storage:link', []],
        ];

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
                $failed = true;
                $results[$label] = [
                    'code' => 1,
                    'error' => $e->getMessage(),
                ];
            }
        }

        return response()->json([
            'status' => $failed ? 'error' : 'ok',
            'results' => $results,
        ], $failed ? 500 : 200);
    }
}
