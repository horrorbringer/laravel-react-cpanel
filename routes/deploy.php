<?php

use App\Http\Controllers\DeployController;
use Illuminate\Support\Facades\Route;

// Post-deploy hook for cPanel shared hosting (no SSH available).
// Trigger after an FTP deploy: https://spa.kimmex.com.kh/deploy?token=YOUR_TOKEN
// Guarded by DEPLOY_TOKEN in .env. Disabled when the token is empty.
Route::get('deploy', [DeployController::class, 'run'])->name('deploy.hook');
