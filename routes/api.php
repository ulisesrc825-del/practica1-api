<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;

// Ruta para listar (Esta ya te funcionaba)
Route::get('/productos', [ProductoController::class, 'index']);

// Ruta para crear (Añádela aquí para que herede el prefijo api/ automáticamente)
Route::post('/productos', [ProductoController::class, 'store']);