<template>
  <div>
    <h2>Danh sách bài viết ({{ posts.length }})</h2>
    
    <div v-for="(post, index) in posts" :key="index" 
      class="post mb-3"
      
      :class="{ 'highlighted': post.title.length > 20 }"
      
      :style="{ backgroundColor: post.backgroundColor, color: post.textColor }"
    >
      
      <h3 class="text-success">{{ post.title }}</h3>
      <h4 class="text-danger small">Tác giả: {{ post.author }}</h4>
      <p>{{ post.content }}</p>
    </div>
    
    <p v-if="posts.length === 0" class="text-muted">Chưa có bài viết nào. Hãy đăng bài đầu tiên!</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Định nghĩa props nhận danh sách bài viết
defineProps({
  posts: {
    type: Array,
    required: true,
  }
});
</script>

<style scoped>
.post {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* Class được binding động khi post.title.length > 20 */
.highlighted {
  border: 2px solid #ffc107; /* Màu vàng nổi bật */
  box-shadow: 0 0 15px rgba(255, 193, 7, 0.4); 
}
</style>