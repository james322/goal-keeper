<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GenerateAIMotivationController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\MarkGoalCompleteController;
use App\Http\Controllers\MarkGoalIncompleteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Dashboard Routes
Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

Route::middleware(['auth', ValidateSessionWithWorkOS::class])->group(function () {
    // Goal Routes
    Route::post('goals', [GoalController::class, 'store'])->name('goals.store');
    Route::delete('goals/{goal}', [GoalController::class, 'destroy'])->can('delete', 'goal')->name('goals.destroy');
    Route::patch('goals/complete/{goal}', MarkGoalCompleteController::class)->name('goals.status.complete');
    Route::patch('goals/incomplete/{goal}', MarkGoalIncompleteController::class)->name('goals.status.incomplete');

    // Motivation Routes
    Route::post('motivation/{goal}', GenerateAIMotivationController::class)->can('update', 'goal')->name('motivation.generate');

});

Route::get('goals/{goal}', [GoalController::class, 'show'])->can('view', 'goal')->name('goals.show');

Route::post('goals/{goal}/comments', [CommentController::class, 'store'])->can('comment', 'goal')->name('comments.store');

Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->can('delete', 'comment')->name('comments.destroy');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
