import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Configuración base de Axios para comunicarse con tu backend de Laravel
axios.defaults.baseURL = 'http://localhost:8000' // Asegúrate de que coincida con el puerto de tu Laravel
axios.defaults.withCredentials = true

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)

  // Getter para validar si está autenticado
  const isAuthenticated = computed(() => !!token.value)

  // Función de inicio de sesión compatible con tu LoginView.vue
  const loginUser = async (credenciales) => {
    try {
      // Petición a tu API de Laravel para iniciar sesión
      const response = await axios.post('/api/login', credenciales)
      
      // Extraemos el token y los datos del usuario de la respuesta
      const tokenRecibido = response.data.token
      const usuarioRecibido = response.data.user

      // Guardamos en el estado de Pinia
      token.value = tokenRecibido
      user.value = usuarioRecibido

      // Guardamos en el LocalStorage para persistir la sesión al recargar
      localStorage.setItem('token', tokenRecibido)
      
      // Configuramos el token por defecto en las cabeceras de Axios para futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenRecibido}`
      
      return response.data
    } catch (error) {
      console.error('Error en el store al iniciar sesión:', error)
      throw error
    }
  }

  // Función para obtener los datos del usuario autenticado (la que pide tu Router Guard)
  const fetchUser = async () => {
    if (!token.value) return
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      const response = await axios.get('/api/user')
      user.value = response.data
    } catch (error) {
      clearAuth()
      throw error
    }
  }

  // Función para limpiar el estado al cerrar sesión o si el token expira
  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  // Exportamos todo para que sea visible en LoginView y en el Router Guard
  return {
    token,
    user,
    isAuthenticated,
    loginUser,
    fetchUser,
    clearAuth
  }
})