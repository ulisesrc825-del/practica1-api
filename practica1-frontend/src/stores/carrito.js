import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    // Carga los datos guardados del localStorage para que sobreviva a las recargas (Punto 4.1)
    items: JSON.parse(localStorage.getItem('carrito') || '[]')
  }),

  getters: {
    // Calcula la cantidad total de artículos (badge del Navbar)
    totalItems: (state) => state.items.reduce((s, i) => s + i.cantidad, 0),
    
    // Calcula el costo total de la compra multiplicando precio por cantidad
    totalPrecio: (state) => state.items.reduce((s, i) => s + Number(i.precio) * i.cantidad, 0),
    
    // Averigua cuántas unidades de un producto específico hay agregadas
    cantidadDeProducto: (state) => (id) =>
      state.items.find(i => i.id === id)?.cantidad || 0,
  },

  actions: {
    // Agrega un producto o incrementa su cantidad si ya existe (Punto 4.2)
    agregar(producto) {
      const existe = this.items.find(i => i.id === producto.id)
      if (existe) {
        existe.cantidad++
      } else {
        // Guardamos las propiedades necesarias asegurando que el precio sea numérico
        this.items.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: Number(producto.precio),
          cantidad: 1
        })
      }
      // NOTA: Ya no hace falta llamar a guardarEnLocalStorage() aquí mano, $subscribe lo hace solo!
    },

    // Elimina un producto por completo sin importar cuántas unidades tenga
    quitar(id) {
      this.items = this.items.filter(i => i.id !== id)
    },

    // Modifica la cantidad de forma manual (+/- o input) (Punto 4.2)
    cambiarCantidad(id, cantidad) {
      const producto = this.items.find(i => i.id === id)
      if (producto) {
        producto.cantidad = cantidad
        // Si la cantidad llega a 0, se elimina automáticamente del carrito (Requisito de rúbrica)
        if (producto.cantidad <= 0) {
          this.quitar(id)
        }
      }
    },

    // Vacía por completo el almacén
    vaciar() {
      this.items = []
    }
  }
})

// ========================================================
// REQUISITO EXACTO PASO 4.2: Sincronización automática con $subscribe
// ========================================================
const carrito = useCarritoStore()

carrito.$subscribe((mutation, state) => {
  localStorage.setItem('carrito', JSON.stringify(state.items))
})