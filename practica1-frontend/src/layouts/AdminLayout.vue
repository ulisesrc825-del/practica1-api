<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>AdminPanel 🛠️</h2>
        <p class="welcome-user">Bienvenido, <strong>{{ authStore.user?.name || 'Jonathan' }}</strong></p>
      </div>
      
      <nav class="sidebar-menu">
        <router-link to="/admin" exact-active-class="active-link">📊 Inicio Dashboard</router-link>
        <router-link to="/admin/productos" active-class="active-link">📦 Gestionar Productos</router-link>
        <hr class="menu-divider" />
        <router-link to="/" class="public-link">🏠 Ir a Tienda Pública</router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="cerrarSesion" class="btn-logout">Cerrar Sesión</button>
      </div>
    </aside>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const cerrarSesion = () => {
  authStore.clearAuth()
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  background-color: #f1f5f9;
}
.sidebar {
  width: 260px;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  box-shadow: 4px 0 10px rgba(0,0,0,0.05);
}
.sidebar-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #38bdf8;
}
.welcome-user {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: #cbd5e1;
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-grow: 1;
}
.sidebar-menu a {
  color: #94a3b8;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}
.sidebar-menu a:hover {
  background-color: #334155;
  color: white;
}
.active-link {
  background-color: #4f46e5 !important;
  color: white !important;
}
.menu-divider {
  border: 0;
  height: 1px;
  background: #334155;
  margin: 1rem 0;
}
.public-link {
  font-size: 0.9rem;
  color: #a7f3d0 !important;
}
.btn-logout {
  width: 100%;
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.btn-logout:hover {
  background-color: #dc2626;
}
.main-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
}
</style>