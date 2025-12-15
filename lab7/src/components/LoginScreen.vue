<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Thông tin đăng nhập cố định
const FIXED_EMAIL = 'ha@gmail.com';
const FIXED_PASSWORD = '123456'; 

const emit = defineEmits(['loginSuccess']);

function handleLogin() {
  errorMessage.value = '';
  
  // 1. Validation cơ bản
  if (!email.value || !password.value) {
    errorMessage.value = 'Vui lòng nhập đầy đủ Email và Mật khẩu.';
    return;
  }
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Vui lòng nhập email hợp lệ.';
    return;
  }

  // 2. Kiểm tra thông tin đăng nhập cố định
  if (email.value === FIXED_EMAIL && password.value === FIXED_PASSWORD) {
    // 💥 LƯU TRẠNG THÁI VÀO LOCAL STORAGE
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUserEmail', email.value);

    // Phát sự kiện lên App.vue
    emit('loginSuccess', email.value);
  } else {
    errorMessage.value = `Email hoặc mật khẩu không chính xác. `;
  }
}
</script>

<template>
  <div class="row justify-content-center pt-5">
    <div class="col-md-5">
      <div class="card shadow-lg border-0">
        <div class="card-header bg-danger text-white text-center">
          <h4 class="mb-0">ĐĂNG NHẬP HỆ THỐNG LAB 7</h4>
        </div>
        <div class="card-body p-4">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="email" class="form-label fw-bold">Email:</label>
              <input type="email" id="email" class="form-control" v-model="email" placeholder="Nhập email của bạn " required>
            </div>
            <div class="mb-4">
              <label for="password" class="form-label fw-bold">Mật khẩu:</label>
              <input type="password" id="password" class="form-control" v-model="password" placeholder="Nhập mật khẩu " required>
            </div>
            
            <div v-if="errorMessage" class="alert alert-danger small">{{ errorMessage }}</div>

            <button type="submit" class="btn btn-danger w-100 fw-bold">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>