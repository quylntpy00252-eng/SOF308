<template>
  <div class="card">
    <div class="card-header bg-info text-white">
      Bài viết chi tiết
    </div>
    <div class="card-body">
      <h2 class="card-title">Bài viết #{{ $route.params.id }}</h2>
      <p class="card-text">
        Nội dung chi tiết của bài viết có ID: {{ $route.params.id }} sẽ được hiển thị ở đây. 
        Trong ứng dụng thực tế, ID này sẽ được dùng để gọi API lấy dữ liệu.
      </p>
      <router-link :to="{ name: 'BlogList' }" class="btn btn-secondary">Quay lại danh sách</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('ID của bài viết:', route.params.id)
</script>