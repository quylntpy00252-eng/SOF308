<template>
  <div class="p-5">
    <p>{{ message }}</p> 
    <button class="btn btn-dark" @click="updateMessage">Thay đổi thông điệp</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'; 

const message = ref('Thông điệp ban đầu'); 

// Định nghĩa hàm xử lý sự kiện (Đã sửa lỗi cú pháp)
const updateMessage = () => { 
  // Dòng thay đổi thông điệp phải nằm bên TRONG hàm
  message.value = 'Thông điệp đã được thay đổi!'; 
};

// **Chú ý:** Đảm bảo không có dòng code nào bị lỗi cú pháp như đã xảy ra.
</script>