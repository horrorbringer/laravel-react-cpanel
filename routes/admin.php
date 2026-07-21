<?php

use App\Http\Controllers\Admin\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('posts', [PostController::class, 'index'])->name('posts.index');
    Route::post('posts/bulk-delete', [PostController::class, 'bulkDestroy'])->name('posts.bulk-delete');
    Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
});
