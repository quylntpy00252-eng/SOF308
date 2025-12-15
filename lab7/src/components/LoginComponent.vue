<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
// Khai báo emit để gửi sự kiện ra ngoài
const emit = defineEmits(['loggedIn']);

function handleLogin() {
  if (username.value.trim() && password.value.trim()) {
    // Phát sự kiện 'loggedIn' kèm theo tên người dùng
    emit('loggedIn', username.value.trim());
  } else {
    alert('Vui lòng nhập Tên đăng nhập và Mật khẩu.');
  }
}
</script>

<template>
  <div class="m-3 p-4 border rounded shadow-sm bg-light">
    <h4 class="text-primary mb-4">Đăng Nhập</h4>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Tên đăng nhập: </label>
        <input type="text" class="form-control" id="username" v-model="username" placeholder="Bình An" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu: </label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="***" required />
      </div>
      <button type="submit" class="btn btn-primary fw-bold">Đăng nhập</button>
    </form>
  </div>
</template>