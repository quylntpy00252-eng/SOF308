<template>
  <div class="card p-4 mx-auto" style="max-width: 400px;">
    <h2 class="card-title text-center">🔑 Đăng nhập</h2>
    <p class="text-center text-muted">Truy cập Dashboard và Thông tin cá nhân</p>
    <div v-if="loginError" class="alert alert-danger">{{ loginError }}</div>
    
    <div class="mb-3">
      <label for="username" class="form-label">Tài khoản </label>
      <input type="text" id="username" v-model="username" class="form-control" placeholder="usename">
    </div>
    
    <div class="mb-3">
      <label for="password" class="form-label">Mật khẩu </label>
      <div class="input-group">
        <input 
          :type="passwordFieldType" 
          id="password" 
          v-model="password" 
          class="form-control" 
          placeholder="pass"
          @keyup.enter="handleLogin"
        >
        <button 
          class="btn btn-outline-secondary" 
          type="button" 
          @click="togglePasswordVisibility"
        >
          {{ showPassword ? 'Ẩn' : 'Hiện' }}
        </button>
      </div>
    </div>
    
    <button @click="handleLogin" class="btn btn-success mt-2">Đăng nhập</button>
    
    <p class="mt-3 text-muted text-center">
     
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../router/index.js' 

const router = useRouter()

const username = ref('')
const password = ref('')
const loginError = ref(null)
const showPassword = ref(false) 


const passwordFieldType = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  loginError.value = null;

  const success = auth.login(username.value, password.value)

  if (success) {
    alert(`Chào mừng ${username.value}!`);
    
    // Điều hướng đến Dashboard (Route được bảo vệ)
    router.push({ name: 'Dashboard' }) 
  } else {
    loginError.value = 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.';
  }
}
</script>