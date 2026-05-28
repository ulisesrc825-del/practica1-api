<template>
  <div class="not-found-container">
    <div class="box">
      <h1>404</h1>
      <h2>PÁGINA NO ENCONTRADA</h2>
      <p>El enlace al que intentas acceder no existe o fue movido de lugar.</p>
      <router-link to="/" class="btn-home">Volver al Inicio Seguro</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f1f5f9;
  font-family: sans-serif;
  text-align: center;
}
.box h1 {
  font-size: 6rem;
  margin: 0;
  color: #ef4444;
  font-weight: 900;
}
.box h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
}
.box p {
  color: #64748b;
  margin-bottom: 2rem;
}
.btn-home {
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}
.btn-home:hover {
  background-color: #3b82f6;
}
</style>