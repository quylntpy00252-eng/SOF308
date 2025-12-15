<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">👋 Chào mừng đến với MyBlog!</h1>
      <p class="col-md-8 fs-4"></p>
      <button @click="goToBlogList" class="btn btn-primary btn-lg">Xem Blog Ngay</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 💡 Điều hướng lập trình (Yêu cầu 3d)
const goToBlogList = () => {
  router.push({ name: 'BlogList' })
}
</script>