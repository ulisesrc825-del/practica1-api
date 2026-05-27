<template>
  <div class="register-container">
    <h2>Crear Cuenta</h2>
    
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Nombre Completo:</label>
        <input 
          id="name"
          v-model="form.name" 
          type="text" 
          required 
          placeholder="Juan Pérez"
        />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input 
          id="email"
          v-model="form.email" 
          type="email" 
          required 
          placeholder="juan@correo.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input 
          id="password"
          v-model="form.password" 
          type="password" 
          required 
          placeholder="Mínimo 8 caracteres"
        />
      </div>

      <div class="form-group">
        <label for="password_confirmation">Confirmar Contraseña:</label>
        <input 
          id="password_confirmation"
          v-model="form.password_confirmation" 
          type="password" 
          required 
          placeholder="Repite tu contraseña"
        />
      </div>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Registrarse' }}
      </button>
    </form>

    <p class="redirect-text">
      ¿Ya tienes cuenta? 
      <router-link to="/login">Inicia sesión aquí</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '' // Exigido por el backend con 'confirmed'
})

const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  // Validación rápida en el frontend antes de enviar
  if (form.value.password !== form.value.password_confirmation) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  
  try {
    await authStore.register(form.value)
    // Registro exitoso: Pinia guarda el token y nos manda al Dashboard
    router.push('/dashboard')
  } catch (error) {
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Error al registrar el usuario. Revisa los datos.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: sans-serif;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:disabled {
  background-color: #a3e4d7;
  cursor: not-allowed;
}
.error-text {
  color: red;
  font-size: 0.9em;
  margin-bottom: 15px;
}
.redirect-text {
  text-align: center;
  margin-top: 15px;
  font-size: 0.9em;
}
</style>