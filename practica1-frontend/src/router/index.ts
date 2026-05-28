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
    name: 'producto-detalle',
    // RUTA EXACTA CORREGIDA: Apunta directo a la carpeta admin donde tienes el archivo
    component: () => import('../views/admin/ProductoDetalle.vue'),
    props: true 
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/CartView.vue')
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

// Guard global de autenticación
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (auth.token && !auth.user) {
    try {
      await auth.fetchUser()
    } catch (error) {
      console.error('Error al recuperar usuario:', error)
      auth.clearAuth()
      return '/login'
    }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  return true
})

export default router