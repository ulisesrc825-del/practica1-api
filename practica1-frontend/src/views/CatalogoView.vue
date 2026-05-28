<template>
  <div class="catalogo-container">
    <header class="catalogo-header">
      <h2>📦 Catálogo de Productos</h2>
      <div class="search-box">
        <input 
          type="text" 
          v-model="busqueda" 
          placeholder="🔍 Buscar por nombre del producto... (ej. Monitor, SSD)"
        />
      </div>
    </header>

    <div v-if="cargando" class="loading">Cargando productos...</div>

    <div v-else class="table-responsive">
      <table class="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th> </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productosFiltrados" :key="producto.id">
            <td>{{ producto.id }}</td>
            <td class="bold">{{ producto.nombre }}</td>
            <td>{{ producto.descripcion || 'Sin descripción' }}</td>
            <td class="precio">${{ producto.precio }}</td>
            <td>
              <span :class="['badge', producto.stock > 0 ? 'instock' : 'outstock']">
                {{ producto.stock }} unidades
              </span>
            </td>
            <td>
              <button 
                @click="carrito.agregar(producto)" 
                :disabled="producto.stock <= 0"
                :class="['btn-carrito', carrito.cantidadDeProducto(producto.id) > 0 ? 'activo' : '']"
              >
                <template v-if="carrito.cantidadDeProducto(producto.id) > 0">
                  En carrito ({{ carrito.cantidadDeProducto(producto.id) }})
                </template>
                <template v-else>
                  {{ producto.stock > 0 ? 'Agregar al carrito' : 'Agotado' }}
                </template>
              </button>
            </td>
          </tr>
          <tr v-if="productosFiltrados.length === 0">
            <td colspan="6" class="no-data">No se encontraron productos coincidentes.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
// PASO 1 — Importar el Store del Carrito de Pinia (Punto 4.5)
import { useCarritoStore } from '../stores/carrito'

// Instanciar el store global
const carrito = useCarritoStore()

const productos = ref([])
const busqueda = ref('')
const cargando = ref(false)

// Obtener los productos desde la API de Laravel
const obtenerProductos = async () => {
  cargando.value = true
  try {
    const response = await axios.get('/api/productos')
    productos.value = response.data
  } catch (error) {
    console.error('Error al cargar los productos:', error)
  } finally {
    cargando.value = false
  }
}

// Filtro en tiempo real por nombre
const productosFiltrados = computed(() => {
  return productos.value.filter(producto => 
    producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

onMounted(() => {
  obtenerProductos()
})
</script>

<style scoped>
.catalogo-container {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.catalogo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.catalogo-header h2 {
  margin: 0;
  color: #1e293b;
}

.search-box input {
  padding: 0.6rem 1.2rem;
  width: 300px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-box input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.productos-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

.productos-table th {
  background-color: #f8fafc;
  color: #64748b;
  padding: 1rem;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.productos-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  vertical-align: middle;
}

.bold {
  font-weight: 500;
  color: #0f172a;
}

.precio {
  font-weight: 600;
  color: #059669;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.instock {
  background-color: #dcfce7;
  color: #15803d;
}

.outstock {
  background-color: #fee2e2;
  color: #b91c1c;
}

/* NUEVOS ESTILOS PARA EL BOTÓN DEL CARRITO */
.btn-carrito {
  padding: 0.5rem 1rem;
  background-color: #10b981; /* Verde esmeralda por defecto */
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.btn-carrito:hover:not(:disabled) {
  background-color: #059669;
  transform: translateY(-1px);
}

/* Clase dinámica azul si el producto ya está en el carrito */
.btn-carrito.activo {
  background-color: #3b82f6;
}

.btn-carrito.activo:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-carrito:disabled {
  background-color: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
}

.loading, .no-data {
  text-align: center;
  padding: 2rem;
  color: #64748b;
}
</style>