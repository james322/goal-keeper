<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGoalRequest;
use App\Models\Goal;

class GoalController extends Controller
{
    public function store(StoreGoalRequest $request)
    {
        $request->user()->goals()->create($request->validated());

        return to_route('dashboard');
    }

    public function destroy(Goal $goal)
    {
        $goal->delete();
        session()->flash('flash.message', 'Goal deleted successfully');

        return to_route('dashboard');
    }
}
