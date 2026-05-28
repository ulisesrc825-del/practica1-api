import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { 
    path: '/', 
    component: () => import('../views/HomeView.vue') 
  },
  { 
    path: '/catalogo', 
    component: () => import('../views/CatalogoView.vue') 
  },
  {
    path: '/catalogo/:id',
    component: () => import('../views/ProductoDetalle.vue'),
    props: true 
  },
  { 
    path: '/login', 
    component: () => import('../views/LoginView.vue') 
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true }, 
    children: [
      { 
        path: '', 
        component: () => import('../views/admin/Dashboard.vue') 
      },
      { 
        path: 'productos', 
        component: () => import('../views/admin/Productos.vue') 
      }
    ]
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: () => import('../views/NotFound.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard global moderno optimizado y corregido
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Inicializar usuario si hay un token guardado pero no tenemos sus datos
  if (auth.token && !auth.user) {
    try {
      await auth.fetchUser()
    } catch (error) {
      console.error('Error al recuperar usuario:', error)
      auth.clearAuth()
      return '/login' // Redirige al login si el token no es válido
    }
  }

  // Si la ruta requiere autenticación y el usuario no está logueado
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // Redirecciona guardando la ruta de destino original
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  // Si todo está en orden, permite el paso libremente
  return true
})

// ¡ESTA LÍNEA ES LA QUE LE FALTA A TU ARCHIVO PARA CORREGIR EL ERROR!
export default router