<template>
  <div class="carrito-container">
    <h2>🛒 Tu Carrito de Compras</h2>

    <div v-if="carrito.items.length === 0" class="carrito-vacio">
      <p>No tienes productos agregados todavía.</p>
      <router-link to="/" class="btn-volver">Ir al Catálogo</router-link>
    </div>

    <div v-else class="carrito-contenido">
      <div class="lista-productos">
        <div v-for="item in carrito.items" :key="item.id" class="item-fila">
          <div class="item-detalles">
            <h4>{{ item.nombre }}</h4>
            <p class="precio-unitario">Precio unitario: ${{ item.precio }}</p>
          </div>
          
          <div class="item-controles">
            <button @click="carrito.cambiarCantidad(item.id, item.cantidad - 1)" class="btn-qty">-</button>
            <span class="cantidad-num">{{ item.cantidad }}</span>
            <button @click="carrito.cambiarCantidad(item.id, item.cantidad + 1)" class="btn-qty">+</button>
          </div>

          <div class="item-subtotal">
            <span>Subtotal: ${{ (item.precio * item.cantidad).toFixed(2) }}</span>
          </div>

          <button @click="carrito.quitar(item.id)" class="btn-eliminar" title="Quitar producto">×</button>
        </div>
      </div>

      <div class="resumen-card">
        <h3>Resumen del Pedido</h3>
        <div class="resumen-fila">
          <span>Artículos totales:</span>
          <strong>{{ carrito.totalItems }} unids</strong>
        </div>
        <div class="resumen-fila total">
          <span>Total General:</span>
          <span class="total-precio">${{ carrito.totalPrecio.toFixed(2) }}</span>
        </div>
        <div class="acciones-carrito">
          <button @click="finalizarCompra" class="btn-pagar">Finalizar Compra</button>
          <button @click="confirmarVaciar" class="btn-vaciar">Vaciar Carrito</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito'
import { useRouter } from 'vue-router'
import axios from 'axios'

const carrito = useCarritoStore()
const router = useRouter()

const confirmarVaciar = () => {
  if (confirm('¿Seguro que deseas remover todos los artículos del carrito?')) {
    carrito.vaciar()
  }
}

const finalizarCompra = async () => {
  if (carrito.items.length === 0) return
  try {
    await axios.post('/api/pedidos', {
      items: carrito.items,
      total: carrito.totalPrecio
    })
    alert('🛒 ¡Compra procesada con éxito!')
    carrito.vaciar()
    router.push('/')
  } catch (error) {
    console.error('Error al procesar el pedido:', error)
    alert('Hubo un problema al guardar la compra.')
  }
}
</script>

<style scoped>
/* Mantén tus estilos originales aquí abajo, están perfectos */
.carrito-container { max-width: 1000px; margin: 0 auto; font-family: sans-serif; padding: 20px; }
h2 { color: #1e293b; margin-bottom: 2rem; }
.carrito-vacio { text-align: center; padding: 3rem; background: white; border-radius: 12px; }
.btn-volver { display: inline-block; margin-top: 1rem; padding: 0.6rem 1.5rem; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; }
.carrito-contenido { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; align-items: start; }
.lista-productos { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
.item-fila { display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 0; border-bottom: 1px solid #f1f5f9; }
.item-controles { display: flex; align-items: center; gap: 0.6rem; }
.btn-qty { border: 1px solid #cbd5e1; background: #f8fafc; padding: 0.3rem 0.7rem; cursor: pointer; border-radius: 4px; }
.resumen-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
.resumen-fila.total { border-top: 2px dashed #e2e8f0; margin-top: 1.2rem; padding-top: 1.2rem; font-size: 1.25rem; font-weight: bold; }
.total-precio { color: #059669; }
.btn-pagar { background: #4f46e5; color: white; border: none; padding: 0.8rem; border-radius: 6px; width: 100%; cursor: pointer; font-weight: bold; }
.btn-vaciar { background: #fee2e2; color: #b91c1c; border: none; padding: 0.6rem; border-radius: 6px; width: 100%; margin-top: 10px; cursor: pointer; }
</style>