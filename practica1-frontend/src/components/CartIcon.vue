<template>
  <router-link to="/carrito" class="cart-link">
    <span class="cart-icon">
      🛒
      <span v-if="carrito.totalItems > 0" class="badge">
        {{ carrito.totalItems }}
      </span>
    </span>
  </router-link>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito'
const carrito = useCarritoStore()
</script>

<style scoped>
.cart-link {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.cart-icon {
  font-size: 1.4rem;
  position: relative;
  cursor: pointer;
}
.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: #ef4444; /* Rojo Rúbrica */
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;
  min-width: 14px;
  text-align: center;
}
</style>