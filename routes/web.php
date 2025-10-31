<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoalController;
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

// Goal Routes
Route::middleware(['auth', ValidateSessionWithWorkOS::class])->group(function () {
    Route::post('goals', [GoalController::class, 'store'])->name('goals.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
