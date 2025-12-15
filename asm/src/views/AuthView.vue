<template>
  <div
    class="auth-bg"
  >
    <div class="auth-box">

      <div class="text-center mb-4 border-bottom pb-3">
        <button 
          :class="['btn me-2 rounded-pill px-4', isLoginMode ? 'btn-success' : 'btn-outline-light']"
          @click="isLoginMode = true"
        >
          Đăng nhập
        </button>

        <button 
          :class="['btn rounded-pill px-4', !isLoginMode ? 'btn-danger' : 'btn-outline-light']"
          @click="isLoginMode = false"
        >
          Đăng ký
        </button>
      </div>

      <h3 class="mb-4 text-center auth-title">
        {{ isLoginMode ? 'Đăng nhập' : 'Đăng ký tài khoản mới' }}
      </h3>

      <form v-if="isLoginMode" @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label> 
          <input v-model="loginEmail" type="email" class="form-control" required /> 
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label> 
          <input v-model="loginPassword" type="password" class="form-control" required /> 
        </div>
        <button class="btn w-100 btn-success mt-3">Đăng nhập</button>
      </form>

      <form v-else @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Tên</label> 
          <input v-model="registerName" type="text" class="form-control" required /> 
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label> 
          <input v-model="registerEmail" type="email" class="form-control" required /> 
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label> 
          <input v-model="registerPassword" type="password" class="form-control" required /> 
        </div>
        <button class="btn w-100 btn-danger mt-3">Đăng ký</button>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore, User } from '../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const isLoginMode = ref(true)

// Login
const loginEmail = ref('')
const loginPassword = ref('')

// Register
const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

onMounted(() => {
  if (userStore.users.length === 0) {
    // store tự load
  }
})

// --- LOGIN ---
const login = () => {
  const foundUser = userStore.users.find(u => u.email === loginEmail.value)

  if (foundUser && foundUser.password === loginPassword.value) {
    const userToken = `token-${foundUser.id}-${Date.now()}`

    userStore.login({
      ...foundUser,
      token: userToken
    })

    alert(`Đăng nhập thành công! Chào mừng ${foundUser.name}.`)
    router.push('/')
  } else {
    alert('Email hoặc mật khẩu không đúng.')
  }
}

// --- REGISTER ---
const register = () => {
  if (!registerName.value || !registerEmail.value || !registerPassword.value) {
    alert('Vui lòng điền đầy đủ thông tin.')
    return
  }

  const newUser: User = {
    id: Date.now(),
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value,
    token: '',
    avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(registerName.value)}&background=random&color=fff&size=150`
  }

  const success = userStore.registerUser(newUser)

  if (success) {
    alert(`Đăng ký thành công cho ${registerName.value}! Vui lòng đăng nhập.`)
    isLoginMode.value = true

    registerName.value = ''
    registerEmail.value = ''
    registerPassword.value = ''
  } else {
    alert('Đăng ký thất bại. Email đã tồn tại.')
  }
}
</script>

<style scoped>
/* ===== BACKGROUND ẢNH ===== */
.auth-bg {
  min-height: 100vh;
  /* Màu nền dự phòng cho Dark Mode nếu ảnh lỗi/không tải được */
  background-color: #121212; 
  background-image: url("https://tse1.mm.bing.net/th/id/OIP.smCFM9Rt8VoxuC2ftsdMzAHaEK?pid=Api&P=0&h=220");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== BOX NỀN TỐI MỜ ===== */
.auth-box {
  width: 100%;
  max-width: 420px;
  padding: 30px;
  border-radius: 16px;
  /* Tăng độ tối và làm mờ */
  background: rgba(0, 0, 0, 0.85); 
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.8);
  /* Thêm border mỏng */
  border: 1px solid rgba(255, 255, 255, 0.1); 
}

/* ===== TEXT INSIDE BOX (Tiêu đề, Label) ===== */
.auth-title, .auth-box label {
    /* Đảm bảo chữ trắng/sáng để tương phản với nền tối của auth-box */
    color: #fff !important; 
}

/* ===== INPUT CONTROL OVERRIDE ===== */
.auth-box .form-control {
  /* Nền input trong suốt/mờ */
  background: rgba(255, 255, 255, 0.1) !important; 
  /* Border sáng hơn */
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #fff !important; 
  transition: border-color 0.2s, box-shadow 0.2s;
}

.auth-box .form-control:focus {
  /* Sử dụng biến thương hiệu cho focus */
  border-color: var(--color-brand) !important; 
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.4) !important;
}

/* Tùy chỉnh nút Outline Light để đồng bộ màu sắc tốt hơn */
.btn-outline-light {
    color: rgba(255, 255, 255, 0.8) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
    transition: all 0.2s;
}
.btn-outline-light:hover {
    color: #000 !important;
    background-color: #fff !important;
    border-color: #fff !important;
}
</style>