<template>
  <div class="container mt-5">
    <h3 class="mb-4">Danh sách bài viết</h3>
    <div class="row">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { usePostStore } from '../store/posts'
import PostCard from '../components/PostCard.vue'

const postStore = usePostStore()

// Load dữ liệu từ localStorage khi mở trang
onMounted(() => {
  postStore.loadPosts()
})

// Computed danh sách bài viết
const posts = computed(() => postStore.posts)

// Watch tự động lưu vào localStorage khi thay đổi
watch(
  () => postStore.posts,
  (newPosts) => {
    postStore.savePosts()
  },
  { deep: true }
)
</script>
