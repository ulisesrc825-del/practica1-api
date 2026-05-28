
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController; 
use App\Http\Controllers\AuthController;
// 1. Importamos el nuevo controlador de pedidos
use App\Http\Controllers\PedidoController;

// Ruta pública para loguearse
Route::post('/login', [AuthController::class, 'login']);

// RUTAS PROTEGIDAS (Solo entran los que tengan Token válido)
Route::middleware('auth:sanctum')->group(function () {
    
    // Esto activa automáticamente: GET, POST, PUT, DELETE para /productos
    Route::apiResource('productos', ProductoController::class);
    
    // 2. Ruta para procesar y guardar la compra del carrito (Puntos Extra Práctica 4)
    Route::post('/pedidos', [PedidoController::class, 'store']);
    
});