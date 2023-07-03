<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Given that this factory should run after the UsersFactory, we
            // already have 10 users created
            'user_id' => fake()->numberBetween(1, 10),
            'message' => fake()->sentence(5),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
