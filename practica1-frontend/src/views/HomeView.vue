<template>
  <div class="home-container">
    <header class="hero">
      <h1>¡Bienvenido a nuestra Tienda Online! 🚀</h1>
      <p>Explora los mejores componentes de hardware con la mejor calidad y rendimiento.</p>
      <div class="nav-buttons">
        <router-link to="/catalogo" class="btn btn-primary">Ver Catálogo de Productos</router-link>
        <router-link to="/login" class="btn btn-secondary">Acceso Administrador</router-link>
      </div>
    </header>

    <section class="featured">
      <h2>Productos Destacados</h2>
      <p>Nuestra selección de componentes de alta calidad listos para tu setup.</p>
      <div class="featured-grid">
        <div class="featured-card">
          <h3>Monitores de Alta Tasa</h3>
          <p>Disfruta de la máxima fluidez en tus juegos y proyectos de desarrollo.</p>
        </div>
        <div class="featured-card">
          <h3>Almacenamiento SSD</h3>
          <p>Velocidades de lectura y escritura ultrarrápidas para tu sistema.</p>
        </div>
        <div class="featured-card">
          <h3>Periféricos Mecánicos</h3>
          <p>Precisión, comodidad y ergonomía en cada pulsación.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  font-family: sans-serif;
  color: #333;
}
.hero {
  background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}
.nav-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}
.btn-primary {
  background-color: #10b981;
  color: white;
}
.btn-primary:hover {
  background-color: #059669;
}
.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}
.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.featured {
  padding: 3rem 2rem;
  text-align: center;
}
.featured h2 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}
.featured-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}
.featured-card {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.featured-card h3 {
  color: #4f46e5;
  margin-bottom: 0.5rem;
}
</style>
