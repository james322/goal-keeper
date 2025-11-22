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
            'goals' => Inertia::scroll(fn () => $request->user()->goals()
                ->when($request->input('filter') == 'completed', fn ($query) => $query->whereNotNull('completed'))
                ->when($request->input('filter') == 'incomplete', fn ($query) => $query->whereNull('completed'))
                ->with('motivation')->latest()->paginate(10)),
        ]);
    }
}
