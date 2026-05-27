<template>
  <div class="dashboard-page">
    <nav class="navbar">
      <h1>Mi Panel de Control</h1>
      <div class="user-info">
        <span>Usuario: Jonathan</span>
        <button @click="logout" class="btn-logout">Cerrar Sesión</button>
      </div>
    </nav>

    <div class="content">
      <h2>¡Bienvenido al Gestor de Productos!</h2>
      <p>A continuación puedes registrar nuevos productos y visualizar los datos de MySQL:</p>

      <!-- Formulario para Agregar Producto -->
      <div class="form-container">
        <h3>Registrar Nuevo Producto</h3>
        <form @submit.prevent="crearProducto" class="inline-form">
          <div class="input-group">
            <label>Nombre</label>
            <input type="text" v-model="nuevoProducto.nombre" placeholder="Ej. Memoria RAM 16GB" required>
          </div>
          <div class="input-group">
            <label>Precio</label>
            <input type="number" step="0.01" v-model="nuevoProducto.precio" placeholder="Ej. 1200.00" required>
          </div>
          <div class="input-group">
            <label>Stock</label>
            <input type="number" v-model="nuevoProducto.stock" placeholder="Ej. 10" required>
          </div>
          <button type="submit" class="btn-submit">Guardar Producto</button>
        </form>
      </div>

      <!-- Tabla de Productos -->
      <div class="table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Producto</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td>{{ producto.id }}</td>
              <td>{{ producto.nombre }}</td>
              <td>${{ producto.precio }}</td>
              <td>{{ producto.stock }}</td>
            </tr>
            <tr v-if="productos.length === 0">
              <td colspan="4" class="text-center">Cargando productos o no hay registros...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()
const productos = ref([])

// Objeto reactivo para capturar los datos del formulario
const nuevoProducto = ref({
  nombre: '',
  precio: '',
  stock: ''
})

// Función para traer los productos desde Laravel
const obtenerProductos = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/productos')
    productos.value = response.data
  } catch (error) {
    console.error('Error al traer los productos:', error)
  }
}

// Función para mandar el nuevo producto a Laravel por POST
const crearProducto = async () => {
  try {
    // Mandamos el objeto por POST a la API protegida de Laravel
    await axios.post('http://localhost:8000/api/productos', nuevoProducto.value)
    
    // Si se guarda con éxito, limpiamos las cajitas del formulario
    nuevoProducto.value.nombre = ''
    nuevoProducto.value.precio = ''
    nuevoProducto.value.stock = ''
    
    // Volvemos a llamar a la lista para que el nuevo producto aparezca abajo de inmediato
    obtenerProductos()
    
    alert('¡Producto registrado con éxito en MySQL!')
  } catch (error) {
    console.error('Error al crear el producto:', error)
    alert('No se pudo registrar el producto. Revisa los datos o las rutas de Laravel.')
  }
}

const logout = () => {
  authStore.clearAuth()
  router.push('/login')
}

onMounted(() => {
  obtenerProductos()
})
</script>

<style scoped>
.navbar {
  background-color: #1e293b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.content {
  padding: 2rem;
}
.btn-logout {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.btn-logout:hover {
  background-color: #dc2626;
}

/* Estilos del Formulario */
.form-container {
  background-color: white;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}
.form-container h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #1e293b;
}
.inline-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
}
.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
}
.input-group label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}
.input-group input {
  padding: 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 1rem;
}
.btn-submit {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.65rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-submit:hover {
  background-color: #059669;
}

/* Estilos de la Tabla */
.table-container {
  overflow-x: auto;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.styled-table th {
  background-color: #4f46e5;
  color: white;
  text-align: left;
  padding: 12px 15px;
}
.styled-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #edf2f7;
}
.styled-table tbody tr:hover {
  background-color: #f8fafc;
}
.text-center {
  text-align: center;
  color: #718096;
}
</style>