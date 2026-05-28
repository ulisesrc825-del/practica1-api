<template>
  <div class="detalle-container">
    <router-link to="/catalogo" class="btn-regresar">⬅️ Volver al Catálogo</router-link>

    <div v-if="cargando" class="loading">Cargando detalles del producto...</div>

    <div v-else-if="error" class="error-box">
      <p>❌ El producto solicitado no existe o no está disponible.</p>
    </div>

    <div v-else-if="producto" class="producto-detalle-card">
      <div class="producto-imagen-placeholder">
        <span>📦</span>
      </div>
      
      <div class="producto-info">
        <span class="categoria-tag">Componente de Alta Calidad</span>
        <h1>{{ producto.nombre }}</h1>
        <p class="descripcion">{{ producto.descripcion || 'Este producto no cuenta con una descripción detallada todavía.' }}</p>
        
        <div class="meta-row">
          <div class="precio-box">
            <span class="label">Precio Individual</span>
            <span class="precio">${{ producto.precio }}</span>
          </div>
          
          <div class="stock-box">
            <span class="label">Disponibilidad</span>
            <span :class="['stock-badge', producto.stock > 0 ? 'in-stock' : 'out-of-stock']">
              {{ producto.stock > 0 ? `${producto.stock} Unidades disponibles` : 'Agotado' }}
            </span>
          </div>
        </div>

        <button :disabled="producto.stock <= 0" class="btn-agregar-carrito">
          🛒 {{ producto.stock > 0 ? 'Añadir al Carrito' : 'No disponible' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const producto = ref(null)
const cargando = ref(true)
const error = ref(false)

// Obtener el ID desde los parámetros de la URL (ej. /producto/5)
const productoId = route.params.id

const obtenerDetalleProducto = async () => {
  cargando.value = true
  error.value = false
  try {
    // Apunta a la ruta de Laravel para un solo producto (show)
    const response = await axios.get(`/api/productos/${productoId}`)
    producto.value = response.data
  } catch (err) {
    console.error('Error al obtener el detalle:', err)
    error.value = true
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  obtenerDetalleProducto()
})
</script>

<style scoped>
.detalle-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.btn-regresar {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.btn-regresar:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.producto-detalle-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

@media (max-width: 650px) {
  .producto-detalle-card {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.producto-imagen-placeholder {
  background-color: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  min-height: 250px;
}

.categoria-tag {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #64748b;
  font-weight: 600;
}

.producto-info h1 {
  margin: 0.5rem 0 1rem 0;