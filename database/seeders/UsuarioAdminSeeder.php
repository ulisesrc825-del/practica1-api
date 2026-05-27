<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsuarioAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Esto creará tu usuario en la tabla 'users' de MySQL
        User::create([
            'name' => 'Jonathan',
            'email' => 'jonathan@correo.com',
            'password' => Hash::make('12345678'), // Encripta la contraseña de forma segura
        ]);
    }
}