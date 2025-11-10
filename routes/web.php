<?php

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
    Route::delete('goals/{goal}', [GoalController::class, 'destroy'])->name('goals.destroy');
    Route::patch('goals/complete/{goal}', MarkGoalCompleteController::class)->name('goals.status.complete');
    Route::patch('goals/incomplete/{goal}', MarkGoalIncompleteController::class)->name('goals.status.incomplete');

    // Motivation Routes
    Route::post('motivation/{goal}', GenerateAIMotivationController::class)->name('motivation.generate');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
