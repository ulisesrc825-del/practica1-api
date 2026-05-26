<script setup lang="ts"></script>

<template>
  <main class="contenedor">
    <h1>Mi Catálogo</h1>
    <ProductosList />
  </main>
</template>

<script setup>
import ProductosList from './components/ProductosList.vue'
</script>

<style>
.contenedor {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>