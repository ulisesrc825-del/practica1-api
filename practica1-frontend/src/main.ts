import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // Jala automáticamente el index.js del router

const app = createApp(App)

app.use(createPinia())
app.use(router) // El paso clave para activar las rutas de la práctica

app.mount('#app')
    