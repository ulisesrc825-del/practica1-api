import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
      // Le avisamos a Axios que use este token para las próximas peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    clearAuth() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      // Limpiamos el token de Axios al cerrar sesión
      delete axios.defaults.headers.common['Authorization']
    }
  }
})

