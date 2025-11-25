<?php

namespace App\Http\Controllers;

use App\Actions\GenerateMotivation;
use App\Http\Requests\StoreGoalRequest;
use App\Mail\FirstGoal;
use App\Models\Goal;
use Illuminate\Support\Facades\Mail;

class GoalController extends Controller
{
    public function store(StoreGoalRequest $request)
    {

        $goal = $request->user()->goals()->create($request->validated());

        if ($request->user()->goals()->count() === 1) {
            $response = new GenerateMotivation($goal)->execute();
            session()->flash('flash.first_goal', 1);
            Mail::to($request->user())->send(new FirstGoal($response->choices[0]->message->content, $request->user()));
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
