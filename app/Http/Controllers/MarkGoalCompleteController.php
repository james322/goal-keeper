<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateGoalCompleteStatusRequest;
use App\Models\Goal;
use Illuminate\Http\RedirectResponse;

class MarkGoalCompleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Goal $goal, UpdateGoalCompleteStatusRequest $request): RedirectResponse
    {

        $goal->completed = now();
        $goal->save();
        session()->flash('flash.message', 'Goal completed!');

        return back();
    }
}
