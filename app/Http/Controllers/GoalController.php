<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGoalRequest;
use App\Models\Goal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class GoalController extends Controller
{
    public function show(Goal $goal): Response
    {
        return Inertia::render('goals/show', [
            'goal' => fn () => $goal->load(['motivation', 'user']),
            'comments' => Inertia::scroll(fn () => $goal->comments()->with('user')->latest()->cursorPaginate(50)),
            'can' => [
                'update_goal' => Auth::check() && Auth::user()->can('update', $goal),
                'delete_goal' => Auth::check() && Auth::user()->can('delete', $goal),
            ],
        ]);
    }

    public function store(StoreGoalRequest $request): RedirectResponse
    {

        $goal = $request->user()->goals()->create($request->validated());

        if ($request->user()->goals()->count() === 1) {
            session()->flash('flash.first_goal', 1);
        }

        session()->flash('flash.message', 'Goal created successfully');

        return to_route('dashboard');
    }

    public function destroy(Goal $goal): RedirectResponse
    {
        $goal->delete();
        session()->flash('flash.message', 'Goal deleted successfully');

        return to_route('dashboard');
    }
}
