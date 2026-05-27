<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController; 
use App\Http\Controllers\AuthController;

// Ruta pública para loguearse
Route::post('/login', [AuthController::class, 'login']);

// RUTAS PROTEGIDAS (Solo entran los que tengan Token válido)
Route::middleware('auth:sanctum')->group(function () {
    
    // Ruta para leer los productos (GET)
    Route::get('/productos', [ProductoController::class, 'index']);
    
    // NUEVA: Ruta para crear productos (POST) - ¡Ya activada!
    Route::post('/productos', [ProductoController::class, 'store']);
    
});