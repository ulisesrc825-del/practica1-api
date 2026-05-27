import axios from 'axios'

// Configuración de la URL base de tu API Laravel
const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

// Interceptor de Petición: Inyecta el token automáticamente si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Interceptor de Respuesta: Si el servidor responde 401, limpia y redirige
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // Si usas window.location evitarás problemas de importación del router
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api