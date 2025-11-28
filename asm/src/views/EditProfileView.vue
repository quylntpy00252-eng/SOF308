<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4" style="background-color: #d4edda;">
      <h3 class="mb-3">Cập nhật thông tin cá nhân</h3>

      <form @submit.prevent="updateProfile">
        <div class="mb-3 text-center">
          <img
            :src="avatarUrl || 'https://via.placeholder.com/150'"
            class="rounded-circle shadow-sm"
            style="width: 150px; height: 150px; object-fit: cover;"
            alt="avatar"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Tên</label>
          <input v-model="name" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu mới nếu muốn đổi" />
        </div>

        <div class="mb-3">
          <label class="form-label">URL ảnh đại diện</label>
          <input v-model="avatarUrl" type="text" class="form-control" placeholder="Nhập URL ảnh" />
        </div>

        <!-- Preview ảnh -->
        <div v-if="avatarUrl" class="mb-3 text-center">
          <img
            :src="avatarUrl"
            class="rounded-circle shadow-sm"
            style="width: 150px; height: 150px; object-fit: cover;"
            alt="preview avatar"
          />
        </div>

        <button class="btn w-100" style="background-color: #198754; color:white;">Cập nhật thông tin</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

if (!userStore.currentUser) {
  alert('Vui lòng đăng nhập để cập nhật thông tin!')
  router.push('/login')
}

// State form
const name = ref('')
const email = ref('')
const password = ref('')
const avatarUrl = ref('')

// Load thông tin user khi mở trang
onMounted(() => {
  if (userStore.currentUser) {
    name.value = userStore.currentUser.name
    email.value = userStore.currentUser.email
    avatarUrl.value = userStore.currentUser.avatarUrl || ''
  }
})

// Cập nhật thông tin user
const updateProfile = () => {
  if (!userStore.currentUser) return

  userStore.updateUser({
    name: name.value,
    email: email.value,
    password: password.value ? password.value : undefined, 
    avatarUrl: avatarUrl.value
  })

  alert('Cập nhật thông tin thành công!')
  router.push({ name: 'Profile' }) // Quay về trang xem thông tin
}
</script>
