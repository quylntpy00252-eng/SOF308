<template>
  <div v-if="currentPost" class="random-banner-container mb-5">
    <router-link :to="{ name: 'PostDetail', params: { id: currentPost.id } }" class="banner-link">
      <div 
        class="banner-content p-4 shadow-lg" 
        :style="{ 
          backgroundImage: `url(${currentPost.imageUrl || 'https://via.placeholder.com/1200x300?text=VueBlog+Random+Post'})`,
          backgroundColor: '#343a40' // Màu nền dự phòng
        }"
      >
        <div class="banner-overlay p-4">
          <span class="badge bg-danger mb-2">🔥 TIN NÓNG HỔI</span>
          <h2 class="banner-title text-white">{{ currentPost.title }}</h2>
          <p class="banner-text text-light d-none d-md-block">{{ currentPost.content.slice(0, 150) }}...</p>
          <p class="banner-footer text-info small">Tác giả: {{ currentPost.author }} | Xem chi tiết &raquo;</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePostStore } from '../store/posts';
import type { Post } from '../store/posts'; // Import Post interface

const postStore = usePostStore();

// Computed để lấy danh sách bài viết (sắp xếp mới nhất)
const allPosts = computed<Post[]>(() => postStore.getAllPosts);

// State cho chỉ mục (index) của bài viết đang hiển thị
const currentIndex = ref(0);
const intervalId = ref<number | null>(null);

// Computed: Bài viết đang hiển thị (dựa trên currentIndex)
const currentPost = computed<Post | null>(() => {
  if (allPosts.value.length === 0) return null;
  // Sử dụng modulo để lặp lại danh sách
  return allPosts.value[currentIndex.value % allPosts.value.length];
});

/**
 * Hàm chuyển sang bài viết tiếp theo sau 5 giây.
 */
const nextPost = () => {
  if (allPosts.value.length > 0) {
    // index mới = (index hiện tại + 1) chia lấy dư cho tổng số bài viết
    currentIndex.value = (currentIndex.value + 1) % allPosts.value.length;
  }
};

/**
 * Bắt đầu thiết lập interval tự động chuyển đổi.
 */
const startAutoSwitch = () => {
  // Xóa interval cũ nếu có
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
  
  // Đặt interval mới, cứ 5000ms (5 giây) thì gọi nextPost
  intervalId.value = setInterval(nextPost, 5000) as unknown as number; 
};

// ================= LIFECYCLE HOOKS =================

// Bắt đầu tự động chuyển đổi khi component được tạo
onMounted(() => {
  // Đảm bảo dữ liệu posts đã được tải
  postStore.loadPosts(); 
  
  // Chỉ chạy carousel nếu có hơn 1 bài viết
  if (allPosts.value.length > 1) {
    startAutoSwitch();
  }
});

// Dọn dẹp: Xóa interval khi component bị hủy (tránh Memory Leak)
onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});
</script>

<style scoped>
.random-banner-container {
  /* Đảm bảo container chiếm toàn bộ chiều rộng, không bị tràn */
  overflow: hidden; 
  border-radius: 8px;
}

.banner-link {
  text-decoration: none;
  display: block;
}

.banner-content {
  /* Cấu hình background image */
  background-size: cover;
  background-position: center;
  height: 300px; /* Chiều cao cố định cho banner */
  display: flex;
  align-items: flex-end; /* Đẩy nội dung xuống dưới */
  transition: transform 0.3s ease;
  border-radius: 8px;
}

.banner-link:hover .banner-content {
  /* Hiệu ứng phóng to nhẹ khi hover */
  transform: scale(1.01); 
}

.banner-overlay {
  width: 100%;
  background: rgba(0, 0, 0, 0.6); /* Lớp phủ tối để làm nổi bật chữ */
  border-radius: 0 0 8px 8px;
}

.banner-title {
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.banner-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>