<script setup>
import { useCarritoStore } from '../stores/carrito'
import { useRouter } from 'vue-router'
import axios from 'axios' // 1. Importamos axios para conectar con el backend

const carrito = useCarritoStore()
const router = useRouter()

// Acción de vaciar con ventana de confirmación
const confirmarVaciar = () => {
  if (confirm('¿Seguro que deseas remover todos los artículos del carrito?')) {
    carrito.vaciar()
  }
}

// 2. Función final actualizada para persistencia en base de datos (Backend Laravel)
const finalizarCompra = async () => {
  if (carrito.items.length === 0) return

  try {
    // Enviamos los items y el total calculado por Pinia a tu ruta /api/pedidos
    await axios.post('/api/pedidos', {
      items: carrito.items,
      total: carrito.totalPrecio
    })

    alert('🛒 ¡Compra procesada con éxito! Tu pedido ha quedado guardado en la base de datos.')
    
    // Limpiamos el carrito y redirigimos al catálogo
    carrito.vaciar()
    router.push('/')
  } catch (error) {
    console.error('Error al procesar el pedido:', error)
    alert('Hubo un problema al comunicar con el servidor para registrar tu compra.')
  }
}
</script>