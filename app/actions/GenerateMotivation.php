<?php

namespace App\Actions;

use App\Models\Goal;
use App\Models\Prompt;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Responses\Chat\CreateResponse;

class GenerateMotivation
{
    public function __construct(public Goal $goal) {}

    public function execute(): CreateResponse
    {
        $prompt = Prompt::inRandomOrder()->first();
        // $assistantPrompt = 'You are a motivational coach who helps users achieve their goals.Your responses should not include html tags or markdown tables. Your advice should be 500 words or less.';
        // $userPrompt = "A user has a goal of '$this->goal->intent' give them specific advice on how to do this or else give them general motivation.";
        $assistantPrompt = $prompt->formattedAssistant();
        $userPrompt = $prompt->formattedUser($this->goal->intent);

        $response = OpenAI::chat()->create([
            'model' => config('ai-details.model'),
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

        $this->goal->motivation()->create([
            'motivation' => $response->choices[0]->message->content,
            'user_prompt' => $userPrompt,
            'assistant_prompt' => $assistantPrompt,
        ]);

        return $response;
    }
}
