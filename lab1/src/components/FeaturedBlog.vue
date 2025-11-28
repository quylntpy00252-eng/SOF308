<script setup lang="ts">
// Dữ liệu cho Bài viết nổi bật chính
const featuredBlog = {
 title: 'Phương pháp tập Pilates giúp phục hồi chấn thương cột sống',
 comments: 16,
 description: 'Ngoài việc giúp duy trì vóc dáng, cải thiện sự linh hoạt, dẻo dai cho người tập, Pilates giúp cơ bắp và các khớp mọc dài hơn, kéo giãn hơn...',
imageUrl: 'https://placehold.co/400x250/5cb85c/ffffff?text=Pilates+Featured' // Ảnh placeholder
};
</script>

<template>
  <div class="card mb-4 shadow-sm border-0">
    <img 
      :src="featuredBlog.imageUrl" 
      class="card-img-top" 
      alt="Featured Image" 
      style="height: 250px; object-fit: cover;"
    >
    
    <div class="card-body">
      <h5 class="card-title fw-bold text-dark">
          {{ featuredBlog.title }} 
          <span class="badge bg-secondary ms-2">{{ featuredBlog.comments }}</span>
      </h5>
      
      <p class="card-text text-muted">{{ featuredBlog.description }}</p>
      
      <a href="#" class="btn btn-info text-white fw-bold">Xem thêm</a>
    </div>
  </div>
</template>

<style scoped>
/* Không cần CSS tùy chỉnh nếu dùng hoàn toàn Bootstrap, 
   hoặc giữ style đơn giản nếu cần.
*/
.card-title .badge {
    /* Điều chỉnh font size của badge nhỏ hơn tiêu đề */
    font-size: 0.7em; 
    vertical-align: top;
}
</style>