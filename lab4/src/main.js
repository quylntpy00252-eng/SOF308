import { createApp } from 'vue';
import App from './App.vue';

// Import Bootstrap CSS (Bắt buộc cho giao diện)
import 'bootstrap/dist/css/bootstrap.css'; 

// Import Bootstrap JS (Không bắt buộc cho Lab 4 này nhưng nên có)
import 'bootstrap/dist/js/bootstrap.bundle'; 

// Import Font Awesome (nếu có icon)
import '@fortawesome/fontawesome-free/css/all.css'; 

createApp(App).mount('#app');