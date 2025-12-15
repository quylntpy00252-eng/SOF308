// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// ✅ Import Bootstrap CSS và JS Bundle
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// ✅ Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(createPinia()) // Khởi tạo Pinia
app.use(router)        // Khởi tạo Router

app.mount('#app')