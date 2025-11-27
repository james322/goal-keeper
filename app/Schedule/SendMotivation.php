<?php

namespace App\Schedule;

use App\Mail\WeeklyMotivation;
use App\Models\User;
use App\Models\WeeklyPrompt;
use Illuminate\Support\Facades\Mail;
use OpenAI\Laravel\Facades\OpenAI;

class SendMotivation
{
    public function __invoke()
    {
        User::with('weeklyIncompleteGoals')->whereHas('goals', function ($query) {

            $query->whereNull('completed')->whereDate('updated_at', '<=', now()->subDays(2));

        })->lazy()->each(function ($user) {
            try {
                $prompt = WeeklyPrompt::inRandomOrder()->first();

                $response = OpenAI::chat()->create([
                    'model' => config('ai-details.model'),
                    'messages' => [
                        [
                            'role' => 'assistant',
                            'content' => $prompt->formattedAssistant(),
                        ],
                        [
                            'role' => 'user',
                            'content' => $prompt->formattedUser(),
                        ],
                    ],
                    'max_completion_tokens' => 1000,

                ]);

                Mail::to($user)->send(new WeeklyMotivation($response->choices[0]->message->content, $user));

            } catch (\Throwable $th) {
                report($th);
            }
        });
    }
}
