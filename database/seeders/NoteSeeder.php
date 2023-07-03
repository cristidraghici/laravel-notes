<?php

namespace Database\Seeders;

use App\Models\Note;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Note::truncate();

        // Create 10 notes for the main user
        Note::factory(10)->create([
            'user_id' => 1
        ]);
    }
}
