<?php

namespace App\Http\Controllers;

use App\Actions\GenerateMotivation;
use App\Http\Requests\StoreGoalRequest;
use App\Models\Goal;

class GoalController extends Controller
{
    public function store(StoreGoalRequest $request)
    {

        $goal = $request->user()->goals()->create($request->validated());

        if ($request->user()->goals()->count() === 1) {
            new GenerateMotivation($goal)->execute();
            session()->flash('flash.first_goal', 1);
        }

        session()->flash('flash.message', 'Goal created successfully');

        return to_route('dashboard');
    }

    public function destroy(Goal $goal)
    {
        $goal->delete();
        session()->flash('flash.message', 'Goal deleted successfully');

        return to_route('dashboard');
    }
}
