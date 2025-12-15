<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function login() {
  // Reset thông điệp lỗi
  emailError.value = '';
  passwordError.value = '';
  
  // Validate email
  if (!email.value) {
    emailError.value = 'Email là bắt buộc.';
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Vui lòng nhập email hợp lệ.';
  }

  // Validate mật khẩu
  if (!password.value) {
    passwordError.value = 'Mật khẩu là bắt buộc.';
  }

  
  if (!emailError.value && !passwordError.value) {
    isLoggedIn.value = true;
  }
}

function logout() {
  isLoggedIn.value = false;
  email.value = '';
  password.value = '';
  emailError.value = '';
  passwordError.value = '';
}
</script>

<template>
  <div class="my-4 p-4 border rounded shadow-sm bg-white row">
    <div class="col-md-6 mx-auto p-4">
        <h3 class="mb-4 text-primary text-center">Bài 2: Đăng nhập</h3>

        <div v-if="!isLoggedIn" class="p-4 border rounded shadow-sm bg-light">
            <h4 class="text-primary">Form Đăng nhập</h4>
            <form @submit.prevent="login">
                <div class="mb-3 mt-3">
                    <label class="form-label fw-bold">Email:</label>
                    <input type="email" class="form-control" v-model="email" placeholder="Nhập email">
                    <p v-if="emailError" class="text-danger mt-1 small">{{ emailError }}</p>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Mật khẩu: </label>
                    <input type="password" class="form-control" v-model="password" placeholder="Nhập mật khẩu">
                    <p v-if="passwordError" class="text-danger mt-1 small">{{ passwordError }}</p>
                </div>
                <button type="submit" class="btn btn-primary fw-bold">Đăng nhập</button>
            </form>
        </div>

        <div v-else class="p-4 border rounded shadow-sm bg-success text-white text-center">
            <h4 class="mb-3">Chào mừng, {{ email }}!</h4>
            <button @click="logout" class="btn btn-light fw-bold">Đăng xuất</button>
        </div>
    </div>
  </div>
</template>