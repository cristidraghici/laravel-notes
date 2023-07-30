<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Schema::enableForeignKeyConstraints();


        User::factory()->create([
            'name' => 'Notes Master',
            'email' => 'test@example.com',
        ]);

        User::factory(9)->create();
    }
}
