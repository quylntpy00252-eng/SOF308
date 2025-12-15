<template>
  <div>
    <h2>📝 Danh sách các bài viết Blog</h2>
    <div class="list-group">
      <router-link 
        v-for="post in posts" 
        :key="post.id" 
        :to="{ name: 'BlogPost', params: { id: post.id } }" 
        class="list-group-item list-group-item-action"
      >
        Bài viết #{{ post.id }}: {{ post.title }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Dữ liệu giả lập
const posts = [
  { id: 1, title: 'Giới thiệu về Vue Router' },
  { id: 2, title: 'Routes lồng nhau và Routes động' },
  { id: 3, title: 'Bảo vệ Route với Navigation Guards' }
]
</script>