<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Goal>
 */
class GoalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'intent' => $this->faker->sentence(),
            'completed' => Arr::random([null, $this->faker->dateTimeBetween('-1 year', '+1 year')]),
        ];
    }

    public function completed(): self
    {
        return $this->state([
            'completed' => $this->faker->dateTimeBetween('-1 year', '+1 year'),
        ]);
    }

    public function incomplete(): self
    {
        return $this->state([
            'completed' => null,
        ]);
    }
}
