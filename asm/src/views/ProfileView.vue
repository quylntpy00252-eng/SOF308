<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4" style="background-color: #d4edda;">
      <h3 class="mb-3">Thông tin cá nhân</h3>

      <div class="text-center mb-3">
        <img
          :src="user.avatarUrl || 'https://via.placeholder.com/150'"
          class="rounded-circle shadow-sm"
          style="width: 150px; height: 150px; object-fit: cover;"
          alt="avatar"
        />
      </div>

      <p><strong>Tên:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <div class="text-center mt-3">
        <router-link class="btn btn-success" :to="{ name: 'EditProfile' }">
          Chỉnh sửa thông tin
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

if (!userStore.currentUser) {
  alert('Vui lòng đăng nhập để xem thông tin cá nhân!')
  router.push('/login')
}

const user = userStore.currentUser
</script>
