<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // 1. REGISTRO: Valida y crea el usuario, retorna token
    public function register(Request $request) {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generamos el token de Sanctum para el usuario
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user
        ], 201); // 201: Created
    }

    // 2. LOGIN: Verifica credenciales y retorna token
    public function login(Request $request) {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Intentar autenticar con las credenciales proporcionadas
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401); // 401: Unauthorized
        }

        // Si es correcto, obtenemos el usuario y generamos su token
        $user  = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user
        ], 200);
    }

    // 3. LOGOUT: Elimina el token actual (requiere middleware auth:sanctum)
    public function logout(Request $request) {
        // Revocar (borrar) el token con el que el usuario se autenticó
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente y token eliminado'
        ], 200);
    }

    // 4. ME: Retorna el usuario autenticado
    public function me(Request $request) {
        return response()->json($request->user(), 200);
    }
}