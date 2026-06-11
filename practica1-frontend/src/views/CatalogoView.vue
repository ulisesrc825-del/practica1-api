<template>
  <div class="catalogo-container">
    <header class="catalogo-header">
      <h2>📦 Catálogo de Productos</h2>
      <div class="search-box">
        <input 
          type="text" 
          v-model="busqueda" 
          placeholder="🔍 Buscar por nombre..."
        />
      </div>
    </header>

    <div v-if="cargando" class="loading">Cargando productos...</div>

    <div v-else class="table-responsive">
      <table class="productos-table">
        <thead>
          <tr>
            <th>Imagen</th> <th>ID</th> <th>Nombre</th>
            <th>Precio</th> <th>Stock</th> <th>Acciones</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productosFiltrados" :key="producto.id">
            <td>
              <img 
                :src="producto.imagen_url || '/placeholder.png'" 
                alt="Imagen" 
                style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"
                @error="$event.target.src = '/placeholder.png'"
              />
            </td>
            <td>{{ producto.id }}</td>
            <td class="bold">{{ producto.nombre }}</td>
            <td class="precio">${{ producto.precio }}</td>
            <td>
              <span :class="['badge', producto.stock > 0 ? 'instock' : 'outstock']">
                {{ producto.stock }} uds
              </span>
            </td>
            <td>
              <button @click="carrito.agregar(producto)" :disabled="producto.stock <= 0">
                {{ producto.stock > 0 ? 'Agregar' : 'Agotado' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()
const productos = ref([])
const busqueda = ref('')
const cargando = ref(false)

const obtenerProductos = async () => {
  cargando.value = true
  try {
    // Si tienes el error 500, intenta quitar '/api' si no está definido en tu ruta
    const response = await axios.get('/api/productos')
    // Ajuste: si response.data es un array directo, úsalo. Si viene en un objeto, usa .data
    productos.value = Array.isArray(response.data) ? response.data : (response.data.data || [])
  } catch (error) {
    console.error('Error detallado:', error.response?.data || error.message)
    alert('Error al cargar productos, revisa la consola F12')
  } finally {
    cargando.value = false
  }
}

const productosFiltrados = computed(() => {
  if (!productos.value) return []
  return productos.value.filter(p => 
    p.nombre?.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

onMounted(obtenerProductos)
</script>

<style scoped>
/* Mantén tus estilos */
.catalogo-container { padding: 1.5rem; }
.productos-table { width: 100%; border-collapse: collapse; }
.productos-table th, .productos-table td { padding: 1rem; border-bottom: 1px solid #eee; }
</style>