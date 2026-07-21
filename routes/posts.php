<?php

use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::post('posts/bulk-delete', [PostController::class, 'bulkDestroy'])->name('posts.bulk-destroy');
    Route::post('posts/bulk-publish', [PostController::class, 'bulkPublish'])->name('posts.bulk-publish');
    Route::post('posts/bulk-unpublish', [PostController::class, 'bulkUnpublish'])->name('posts.bulk-unpublish');
    Route::post('posts/autosave', [PostController::class, 'autosaveStore'])->name('posts.autosave');
    Route::put('posts/{post}/autosave', [PostController::class, 'autosaveUpdate'])->name('posts.autosave.update');

    Route::post('posts/{post}/like', [LikeController::class, 'toggle'])->name('posts.like');
    Route::post('posts/{post}/bookmark', [BookmarkController::class, 'toggle'])->name('posts.bookmark');
    Route::post('posts/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store');
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
