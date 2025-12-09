<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateGoalCompleteStatusRequest;
use App\Models\Goal;
use Illuminate\Http\RedirectResponse;

class MarkGoalIncompleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Goal $goal, UpdateGoalCompleteStatusRequest $request): RedirectResponse
    {
        $goal->completed = null;
        $goal->save();
        session()->flash('flash.message', 'Goal marked as incomplete.');

        return back();
    }
}
