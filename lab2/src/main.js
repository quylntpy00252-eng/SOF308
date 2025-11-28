import { createApp } from 'vue';
import App from './App.vue';

// 1. Import Bootstrap CSS
// Bạn phải đảm bảo đã cài đặt Bootstrap 5 bằng npm: npm install bootstrap
import 'bootstrap/dist/css/bootstrap.css'; 

// 2. Import Bootstrap JavaScript (để Modal, Tabs hoạt động)
// Note: Bootstrap 5.x không cần jQuery
import 'bootstrap/dist/js/bootstrap.bundle'; 

// 3. Khởi tạo và gắn ứng dụng Vue vào DOM
createApp(App).mount('#app');