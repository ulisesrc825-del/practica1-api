<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // <-- 1. REVISA ESTA LÍNEA

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // <-- 2. ASEGÚRATE QUE TENGA 'HasApiTokens' AQUÍ

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}