<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    // Permitimos la asignación masiva de estos campos desde el controlador
    protected $fillable = [
        'user_id',
        'contenido_carrito',
        'total'
    ];

    // REQUISITO CLAVE: Convierte automáticamente el JSON de la BD a un array de PHP
    protected $casts = [
        'contenido_carrito' => 'array'
    ];

    // Relación: Un pedido pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}