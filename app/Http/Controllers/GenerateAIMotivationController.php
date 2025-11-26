<?php

namespace App\Http\Controllers;

use App\Actions\GenerateMotivation;
use App\Http\Requests\UpdateGoalRequest;
use App\Mail\FirstGoal;
use App\Models\Goal;
use Illuminate\Support\Facades\Mail;

class GenerateAIMotivationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateGoalRequest $request, Goal $goal)
    {
        abort_if($goal->motivation()->exists(), 422);

        $response = new GenerateMotivation($goal)->execute();

        if ($request->user()->goals()->count() === 1) {
            Mail::to($request->user())->send(new FirstGoal($response->choices[0]->message->content, $request->user()));
        }

        return response()->json(['message' => $response->choices[0]->message->content]);
    }
}
