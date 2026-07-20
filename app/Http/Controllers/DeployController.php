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
            'migrate --force' => Artisan::call('migrate', ['--force' => true]),
            'config:clear' => Artisan::call('config:clear'),
            'route:clear' => Artisan::call('route:clear'),
            'view:clear' => Artisan::call('view:clear'),
            'cache:clear' => Artisan::call('cache:clear'),
            'storage:link' => Artisan::call('storage:link'),
        ];

        $output = [];

        foreach ($commands as $label => $code) {
            $output[$label] = [
                'code' => $code,
                'output' => Artisan::output(),
            ];
        }

        return response()->json([
            'status' => 'ok',
            'results' => $output,
        ]);
    }
}
