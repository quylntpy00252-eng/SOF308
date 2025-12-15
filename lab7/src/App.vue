<script setup>
import { ref, onMounted } from 'vue'; // 💥 Import onMounted hook
import LoginScreen from './components/LoginScreen.vue'; // Import màn hình đăng nhập
import Bai1 from './components/bai1.vue';
import Bai3 from './components/bai3.vue';
import Bai4 from './components/Unified.vue';

// 💥 1. KIỂM TRA LOCAL STORAGE NGAY KHI KHAI BÁO BIẾN
const storedStatus = localStorage.getItem('isLoggedIn');
const storedEmail = localStorage.getItem('loggedInUserEmail');

const isLoggedIn = ref(storedStatus === 'true' && storedEmail !== null);
const loggedInUserEmail = ref(storedEmail || ''); // Sử dụng email đã lưu hoặc chuỗi rỗng

const currentBai = ref(1); 

// Xử lý sự kiện đăng nhập thành công từ LoginScreen
function handleLoginSuccess(email) {
  // 💥 2. LƯU VÀO LOCAL STORAGE KHI THÀNH CÔNG
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('loggedInUserEmail', email);

  loggedInUserEmail.value = email;
  isLoggedIn.value = true;
}

function handleLogout() {
  // Xóa trạng thái đăng nhập khỏi Local Storage khi đăng xuất
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedInUserEmail');

  isLoggedIn.value = false;
  loggedInUserEmail.value = '';
  currentBai.value = 1; 
}
</script>

<template>
  <div id="app" class="container mt-5">
    
    <LoginScreen v-if="!isLoggedIn" @loginSuccess="handleLoginSuccess" />

    <div v-else>
        <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <h1 class="text-danger fw-bold">LAB 7 - CHỨC NĂNG CHÍNH</h1>
            <div class="d-flex align-items-center">
                 <span class="me-3 text-muted">Xin chào, <strong>{{ loggedInUserEmail }}</strong></span>
                 <button @click="handleLogout" class="btn btn-outline-secondary btn-sm">Đăng xuất</button>
            </div>
        </div>

        <div class="nav-bar mb-4 p-3 bg-danger bg-gradient rounded shadow-lg">
            <h5 class="text-white mb-2">Chọn Bài Thực Hành:</h5>
            <button @click="currentBai = 1" :class="{ 'active': currentBai === 1 }" class="btn btn-sm btn-outline-light me-2">Bài 1 </button>
            <button @click="currentBai = 3" :class="{ 'active': currentBai === 3 }" class="btn btn-sm btn-outline-light me-2">Bài 3 </button>
            <button @click="currentBai = 4" :class="{ 'active': currentBai === 4 }" class="btn btn-sm btn-outline-light">Bài 4 </button>
        </div>

        <hr class="text-secondary">

        <div class="main-content">
            <Bai1 v-if="currentBai === 1" />
            <Bai3 v-else-if="currentBai === 3" />
            <Bai4 v-else-if="currentBai === 4" :username="loggedInUserEmail" />
        </div>
    </div>
  </div>
</template>


<style scoped>
#app {
  max-width: 1200px;
}
.nav-bar button.active {
    background-color: white; 
    color: #dc3545; 
    border-color: white;
    font-weight: bold;
}
</style>