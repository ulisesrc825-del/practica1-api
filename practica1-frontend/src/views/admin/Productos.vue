<template>
  <div class="admin-productos">
    <header class="header-seccion">
      <h2>📦 Gestión de Inventario de Productos</h2>
      <p>Da de alta, edita o elimina los productos de la base de datos.</p>
    </header>

    <div class="grid-productos">
      <div class="card-formulario">
        <h3>{{ editandoId ? '📝 Editar Producto' : '➕ Agregar Nuevo Producto' }}</h3>
        <form @submit.prevent="guardarProducto">
          <div class="form-group">
            <label>Nombre del Producto</label>
            <input type="text" v-model="form.nombre" placeholder="Ej. Monitor NACEB 24" required />
          </div>

          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="form.descripcion" placeholder="Características del producto..."></textarea>
          </div>

          <div class="form-group-row">
            <div class="form-group">
              <label>Precio ($)</label>
              <input type="number" v-model.number="form.precio" step="0.01" min="0" required />
            </div>
            <div class="form-group">
              <label>Stock (Unidades)</label>
              <input type="number" v-model.number="form.stock" min="0" required />
            </div>
          </div>

          <div class="acciones-form">
            <button type="submit" class="btn btn-guardar">
              {{ editandoId ? 'Actualizar' : 'Guardar Producto' }}
            </button>
            <button type="button" v-if="editandoId" @click="cancelarEdicion" class="btn btn-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="card-tabla">
        <h3>Listado General</h3>
        <div v-if="cargando" class="loading">Conectando con Laravel...</div>
        
        <div v-else class="table-responsive">
          <table class="tabla-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prod in listaProductos" :key="prod.id">
                <td>{{ prod.id }}</td>
                <td>
                  <span class="prod-name">{{ prod.nombre }}</span>
                  <small class="prod-desc">{{ prod.descripcion }}</small>
                </td>
                <td class="precio">${{ prod.precio }}</td>
                <td>
                  <span :class="['stock-badge', prod.stock > 0 ? 'in' : 'out']">
                    {{ prod.stock }} unids
                  </span>
                </td>
                <td>
                  <div class="btn-group">
                    <button @click="cargarEdicion(prod)" class="btn-accion btn-edit" title="Editar">✏️</button>
                    <button @click="eliminarProducto(prod.id)" class="btn-accion btn-delete" title="Eliminar">🗑️</button>
                  </div>
                </td>
              </tr>
              <tr v-if="listaProductos.length === 0">
                <td colspan="5" class="no-data">No hay productos registrados en la base de datos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

const listaProductos = ref([])
const cargando = ref(false)
const editandoId = ref(null)

const form = reactive({
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0
})

// Cargar la lista desde la API de Laravel
const consultarProductos = async () => {
  cargando.value = true
  try {
    const response = await axios.get('/api/productos')
    listaProductos.value = response.data
  } catch (error) {
    console.error('Error al consultar productos:', error)
  } finally {
    cargando.value = false
  }
}

// Guardar o Actualizar registro
const guardarProducto = async () => {
  try {
    if (editandoId.value) {
      // Modo Edición (PUT)
      await axios.put(`/api/productos/${editandoId.value}`, form)
      alert('¡Producto actualizado correctamente!')
    } else {
      // Modo Creación (POST)
      await axios.post('/api/productos', form)
      alert('¡Producto registrado con éxito!')
    }
    limpiarFormulario()
    consultarProductos()
  } catch (error) {
    console.error('Error al guardar el producto:', error)
    alert('Hubo un error al procesar la solicitud.')
  }
}

// Eliminar registro de la Base de Datos
const eliminarProducto = async (id) => {
  if (confirm('¿Estás completamente seguro de eliminar este producto?')) {
    try {
      await axios.delete(`/api/productos/${id}`)
      consultarProductos()
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }
  }
}

// Preparar formulario para editar
const cargarEdicion = (prod) => {
  editandoId.value = prod.id
  form.nombre = prod.nombre
  form.descripcion = prod.descripcion
  form.precio = prod.precio
  form.stock = prod.stock
}

const cancelarEdicion = () => {
  limpiarFormulario()
}

const limpiarFormulario = () => {
  editandoId.value = null
  form.nombre = ''
  form.descripcion = ''
  form.precio = 0
  form.stock = 0
}

onMounted(() => {
  consultarProductos()
})
</script>

<style scoped>
.admin-productos {
  font-family: system-ui, -apple-system, sans-serif;
}

.header-seccion {
  margin-bottom: 2rem;
}

.header-seccion h2 {
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.header-seccion p {
  color: #64748b;
  margin: 0;
}

.grid-productos {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .grid-productos {
    grid-template-columns: 1fr;
  }
}

/* Tarjetas */
.card-formulario, .card-tabla {
  background: white;
  padding: 1.75rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
}

/* Formulario */
.form-group {
  margin-bottom: 1.25rem;
}

.form-group-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #475569;
  font-size: 0.9rem;
}

input, textarea {
  width: 100%;
  padding: 0.65rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 0.95rem;
}

textarea {
  resize: vertical;
  height: 80px;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Botones */
.acciones-form {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.65rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
}

.btn-guardar {
  background-color: #2563eb;
  color: white;
  flex-grow: 1;
}

.btn-guardar:hover { background-color: #1d4ed8; }

.btn-cancelar {
  background-color: #e2e8f0;
  color: #475569;
}

.btn-cancelar:hover { background-color: #cbd5e1; }

/* Tablas */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.tabla-admin {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.tabla-admin th {
  background-color: #f8fafc;
  padding: 0.75rem 1rem;
  color: #64748b;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.tabla-admin td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.prod-name {
  display: block;
  font-weight: 600;
  color: #1e293b;
}

.prod-desc {
  display: block;
  font-size: 0.8rem;
  color: #94a3b8;
}

.precio {
  font-weight: 600;
  color: #059669;
}

.stock-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.stock-badge.in { background-color: #dcfce7; color: #15803d; }
.stock-badge.out { background-color: #fee2e2; color: #b91c1c; }

.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn-accion {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-accion:hover { background: #e2e8f0; }
.loading, .no-data { text-align: center; color: #64748b; padding: 2rem; }
</style>