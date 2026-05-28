<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use Illuminate\Support\Facades\Auth;

class PedidoController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validamos que desde Vue llegue el arreglo de productos y el total de la compra
        $request->validate([
            'items' => 'required|array',
            'total' => 'required|numeric'
        ]);

        // 2. Registramos el pedido vinculándolo automáticamente con el usuario autenticado (vía Sanctum)
        $pedido = Pedido::create([
            'user_id' => Auth::id(), 
            'contenido_carrito' => $request->items,
            'total' => $request->total
        ]);

        // 3. Respondemos al frontend con un mensaje de éxito y los datos del pedido guardado
        return response()->json([
            'message' => '¡Pedido registrado con éxito en el servidor!',
            'pedido' => $pedido
        ], 201);
    }
}