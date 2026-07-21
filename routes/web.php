<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', SearchController::class)->name('search');

Route::middleware(['auth', 'verified'])->group(function () {
    //
});

require __DIR__.'/posts.php';
require __DIR__.'/deploy.php';
require __DIR__.'/settings.php';
