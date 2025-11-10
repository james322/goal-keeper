<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateGoalRequest;
use App\Models\Goal;
use OpenAI\Laravel\Facades\OpenAI;

class GenerateAIMotivationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateGoalRequest $request, Goal $goal)
    {
        abort_if($goal->motivation()->exists(), 422);

        $assistantPrompt = 'You are a motivational coach who helps users achieve their goals.Your responses should not include html tags or markdown tables. Your advice should be 500 words or less.';
        $userPrompt = "A user has a goal of '$goal->intent' give them specific advice on how to do this or else give them general motivation.";

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'assistant',
                    'content' => $assistantPrompt,
                ],
                [
                    'role' => 'user',
                    'content' => $userPrompt,
                ],
            ],
            'max_tokens' => 1000,

        ]);

        $goal->motivation()->create([
            'motivation' => $response->choices[0]->message->content,
            'user_prompt' => $userPrompt,
            'assistant_prompt' => $assistantPrompt,
        ]);

        return response()->json(['message' => $response->choices[0]->message->content]);
    }
}
