<template>
  <div class="trending-container my-5">
    
    <h4 class="mb-3 text-body-emphasis fw-bold">🔥 Bản tin đề cử</h4>
    
    <div class="d-flex flex-nowrap overflow-auto horizontal-scroll-container">
      
      <div 
        v-for="post in topPosts" 
        :key="post.id" 
        class="trending-card flex-shrink-0 me-3 shadow-sm bg-body"
      >
        <router-link 
          :to="{ name: 'PostDetail', params: { id: post.id } }" 
          class="card-link text-decoration-none text-body"
        >
          <img 
            :src="post.imageUrl || 'https://via.placeholder.com/250x150?text=Trending+Post'" 
            class="card-img-top" 
            alt="Post Image"
          />
          <div class="card-body p-2">
            <p class="card-text fw-bold text-truncate">{{ post.title }}</p>
            <small class="text-muted">{{ post.author }}</small>
          </div>
        </router-link>
      </div>

      <div v-if="topPosts.length === 0" class="p-3 text-muted">
          Không có bài viết nào để đề cử.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePostStore } from '../store/posts'

const postStore = usePostStore()

const topPosts = computed(() => {
  const sortedPosts = postStore.getAllPosts
  return sortedPosts.slice(0, 5)
})
</script>

### 2. Style (Đã loại bỏ các quy tắc màu chữ cũ)

```vue
<style scoped>
/* ======================================= */
/* CHỈ GIỮ LẠI LAYOUT & HIỆU ỨNG CSS */
/* (Tất cả quy tắc màu chữ cố định và body.dark-mode đã được xóa) */
/* ======================================= */
.horizontal-scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

.trending-card {
  width: 250px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  /* ❌ Đã xóa background-color: #fff; */
}

.trending-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

.card-link {
  /* ❌ Đã xóa các thuộc tính màu chữ và gạch chân cũ */
  display: block;
}

.card-img-top {
  height: 150px;
  object-fit: cover;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>