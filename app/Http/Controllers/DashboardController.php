<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('dashboard', [
            'goals' => Inertia::scroll(fn () => $request->user()->goals()->with('motivation')->latest()->cursorPaginate(20)),
        ]);
    }
}
