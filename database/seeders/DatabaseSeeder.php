<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Prompt;
use App\Models\WeeklyPrompt;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $prompts = file_get_contents(base_path().'/prompts.json');
        $weeklyPrompts = file_get_contents(base_path().'/weekly-prompts.json');

        throw_unless($prompts, 'failed to open prompts.json');
        throw_unless($weeklyPrompts, 'failed to open prompts.json');

        $prompts = json_decode($prompts);
        $weeklyPrompts = json_decode($weeklyPrompts);

        foreach ($prompts->prompts as $prompt) {
            Prompt::factory()->create([
                'assistant' => $prompt->assistant,
                'user' => $prompt->user,
                'personality' => $prompt->personality,
            ]);
        }

        foreach ($weeklyPrompts->prompts as $weeklyPrompt) {
            WeeklyPrompt::factory()->create([
                'assistant' => $weeklyPrompt->assistant,
                'user' => $weeklyPrompt->user,
                'personality' => $weeklyPrompt->personality,
            ]);
        }
    }
}
