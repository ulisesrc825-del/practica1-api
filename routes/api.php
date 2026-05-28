
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController; 
use App\Http\Controllers\AuthController;

// Ruta pública para loguearse
Route::post('/login', [AuthController::class, 'login']);

// RUTAS PROTEGIDAS (Solo entran los que tengan Token válido)
Route::middleware('auth:sanctum')->group(function () {
    
    // Esto activa automáticamente: GET, POST, PUT, DELETE para /productos
    Route::apiResource('productos', ProductoController::class);
    
});