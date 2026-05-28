<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <h3>Admin Panel</h3>
      </div>
      <nav class="sidebar-menu">
        <router-link to="/admin" class="menu-item active">📊 Dashboard</router-link>
        <router-link to="/catalogo" class="menu-item">📦 Ver Catálogo</router-link>
        <button @click="cerrarSesion" class="menu-item btn-logout">🚪 Cerrar Sesión</button>
      </nav>
    </aside>

    <main class="main-content">
      <header class="content-header">
        <h2>Bienvenido al Panel de Control, {{ authStore.user?.name || 'Administrador' }} 🚀</h2>
        <p class="date-text">Gestión del CRUD de Productos y Sesiones Autenticadas.</p>
      </header>

      <section class="metrics-grid">
        <div class="card card-blue">
          <h3>Sesión Activa</h3>
          <p class="status-badge">Conectado con Éxito</p>
        </div>
        <div class="card card-green">
          <h3>Token de Acceso</h3>
          <p class="token-text">Almacenado de forma segura en LocalStorage</p>
        </div>
        <div class="card card-purple">
          <h3>Práctica 3</h3>
          <p class="status-badge complete">¡Criterios Completados! 🎉</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const cerrarSesion = () => {
  if (confirm('¿Estás seguro de que deseas salir del panel?')) {
    authStore.clearAuth()
    router.push('/login')
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #334155;
}

.sidebar-brand h3 {
  margin: 0;
  font-size: 1.3rem;
  letter-spacing: 1px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  flex-grow: 1;
}

.menu-item {
  padding: 1rem 2rem;
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  text-align: left;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

.menu-item:hover, .menu-item.active {
  background-color: #334155;
  color: white;
}

.btn-logout {
  margin-top: auto;
  color: #f87171;
  border-top: 1px solid #334155;
  padding-top: 1.5rem;
}

.btn-logout:hover {
  background-color: #ef4444;
  color: white;
}

/* Contenido Principal */
.main-content {
  flex-grow: 1;
  padding: 2.5rem;
}

.content-header h2 {
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.date-text {
  color: #64748b;
  margin: 0 0 2.5rem 0;
}

/* Tarjetas */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #cbd5e1;
}

.card h3 {
  margin: 0 0 1rem 0;
  color: #475569;
  font-size: 1.1rem;
}

.card-blue { border-left-color: #3b82f6; }
.card-green { border-left-color: #22c55e; }
.card-purple { border-left-color: #a855f7; }

.status-badge {
  display: inline-block;
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
}

.status-badge.complete {
  background-color: #dcfce7;
  color: #166534;
}

.token-text {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}
</style>