<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      <p class="subtitle">Ingresa tus credenciales para acceder al panel administrativo</p>

      <form @submit.prevent="manejarLogin">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="credenciales.email" 
            placeholder="ejemplo@correo.com" 
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="credenciales.password" 
            placeholder="********" 
            required
          />
        </div>

        <button type="submit" :disabled="cargando" class="btn-login">
          {{ cargando ? 'Iniciando sesión...' : 'Ingresar al Panel' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const cargando = ref(false)
const credenciales = reactive({
  email: '',
  password: ''
})

const manejarLogin = async () => {
  cargando.value = true
  try {
    // 1. Invoca la función correspondiente en tu store de Pinia
    await authStore.loginUser(credenciales)    
    
    // 2. Redirección inteligente (Criterio 4.8 de la rúbrica)
    const destino = route.query.redirect || '/admin'
    router.push(destino)
  } catch (error) {
    console.error(error)
    alert('Credenciales incorrectas. Intenta de nuevo.')
  } finally { // <--- ¡AQUÍ ESTÁ LA CORRECCIÓN! Con doble 'l'
    cargando.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: sans-serif;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-top: 0;
  color: #1e293b;
  text-align: center;
}

.subtitle {
  color: #64748b;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-weight: 600;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-login:hover {
  background-color: #2563eb;
}

.btn-login:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}
</style>