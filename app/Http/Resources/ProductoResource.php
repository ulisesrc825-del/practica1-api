<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'nombre'      => $this->nombre,
            'descripcion' => $this->descripcion ?? 'Sin descripción',
            'precio'      => (float) $this->precio,
            'stock'       => (int) $this->stock,
            'imagen_url'  => $this->imagen ? asset('storage/' . $this->imagen) : null,
        ];
    }
}