<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            
            // 1. Vincula el pedido con el ID del usuario que está comprando
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // 2. Campo tipo JSON para guardar toda la lista de productos del carrito
            $table->json('contenido_carrito'); 
            
            // 3. Campo decimal para almacenar el costo total general de la compra
            $table->decimal('total', 10, 2);
            
            // 4. Crea las columnas automáticas de Laravel: created_at y updated_at
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};