<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Motivation>
 */
class MotivationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'motivation' => $this->faker->paragraph(3),
            'assistant_prompt' => $this->faker->sentence(),
            'user_prompt' => $this->faker->sentence(),
        ];
    }
}
