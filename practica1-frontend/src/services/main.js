import axios from 'axios'

// Configuración base para conectarse a tu Laravel
axios.defaults.baseURL = 'http://localhost:8000/api'

// Esto es vital para Sanctum: le dice a Axios que envíe las cookies y tokens automáticamente
axios.defaults.withCredentials = true

// Si ya tenemos un token guardado en el store, lo metemos en la cabecera de las peticiones
const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axios