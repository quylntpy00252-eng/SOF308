<script setup>
import { ref } from 'vue';

// Import các component của từng bài
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import Bai4 from './components/Bai4.vue'; 

// Khởi tạo biến reactive để quản lý trạng thái bài đang chạy
const currentBai = ref(0); 
</script>

<template>
  <div id="app" class="container mt-5">
    <h1 class="text-center mb-4 text-success fw-bold">LAB 6 </h1>

    <div class="nav-bar mb-4 p-3 bg-primary bg-gradient rounded shadow-lg">
      <h5 class="text-white mb-2">Chọn Bài Thực Hành:</h5>
      <button @click="currentBai = 1" :class="{ 'active': currentBai === 1 }" class="btn btn-sm btn-outline-light me-2">Bài 1 </button>
      <button @click="currentBai = 2" :class="{ 'active': currentBai === 2 }" class="btn btn-sm btn-outline-light me-2">Bài 2 </button>
      <button @click="currentBai = 3" :class="{ 'active': currentBai === 3 }" class="btn btn-sm btn-outline-light me-2">Bài 3 </button>
      <button @click="currentBai = 4" :class="{ 'active': currentBai === 4 }" class="btn btn-sm btn-outline-light">Bài 4 </button>
    </div>

    <hr class="text-secondary">

    <div class="main-content">
      <Bai1 v-if="currentBai === 1" />
      <Bai2 v-else-if="currentBai === 2" />
      <Bai3 v-else-if="currentBai === 3" />
      <Bai4 v-else-if="currentBai === 4" />
      
      <div v-else class="alert alert-primary mt-4 text-center border-0 shadow-sm p-5">
        <h3 class="text-primary">Chào mừng!</h3>
        <p class="mb-0">Sử dụng thanh điều hướng phía trên để chuyển đổi giữa các bài tập.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  max-width: 1200px;
}
/* Thiết lập màu cho nút đang active */
.nav-bar button.active {
    background-color: white; 
    color: #0d6efd;
    border-color: white;
    font-weight: bold;
}
</style>