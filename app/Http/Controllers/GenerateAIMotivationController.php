<?php

namespace App\Http\Controllers;

use App\Actions\GenerateMotivation;
use App\Http\Requests\UpdateGoalRequest;
use App\Models\Goal;

class GenerateAIMotivationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateGoalRequest $request, Goal $goal)
    {
        abort_if($goal->motivation()->exists(), 422);

        $response = new GenerateMotivation($goal)->execute();

        return response()->json(['message' => $response->choices[0]->message->content]);
    }
}
