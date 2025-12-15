import { createApp } from 'vue'
import App from './App.vue'
// 💡 Import đối tượng router
import router from './router' 

// Import Bootstrap CSS (sử dụng cú pháp gọn)
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

// 💡 Cho ứng dụng Vue sử dụng Vue Router
app.use(router)

app.mount('#app')