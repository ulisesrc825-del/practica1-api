<?php

use Illuminate\Support\Facades\Route;

// Cualquier ruta que escriba el usuario (excepto las que empiezan con api/) 
// cargará la vista principal de Laravel donde está montado Vue.
Route::get('{any}', function () {
    return view('welcome'); // Asegúrate de que esta sea la vista donde pusiste @vite(['src/main.ts'])
})->where('any', '.*');
