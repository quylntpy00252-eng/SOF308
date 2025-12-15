<script setup>
import { ref } from 'vue';

// Nhận username từ component cha
const props = defineProps(['username']); 

const commentText = ref('');
// Mảng chứa các bình luận đã gửi
const comments = ref([
    { name: 'Khách', text: 'Bài viết rất hữu ích.' }
]);

function submitComment() {
  if (commentText.value.trim()) {
    // Thêm bình luận mới, sử dụng props.username
    comments.value.push({
      name: props.username, 
      text: commentText.value.trim()
    });
    // Xóa dữ liệu trong form sau khi gửi
    commentText.value = '';
  }
}
</script>

<template>
  <div class="m-3 p-4 border rounded shadow-sm bg-white">
    <h4 class="text-success mb-4">Bình luận bài viết</h4>
    
    <div class="card mb-3 border-secondary">
      <img src="https://picsum.photos/600/200?random=1" class="card-img-top" alt="Hình ảnh bài viết" style="height: 150px; object-fit: cover;" />
      <div class="card-body">
        <h5 class="card-title fw-bold text-success">8 loại rau củ quả giàu canxi</h5>
        <p class="card-text small text-muted">Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...</p>
      </div>
    </div>
    
    <form @submit.prevent="submitComment" class="mb-4">
        <p class="small text-muted">Đang đăng nhập với tên: <strong>{{ props.username }}</strong></p>
        <textarea 
            id="commentText" 
            rows="3"
            class="form-control mb-2" 
            v-model="commentText" 
            placeholder="Nhập bình luận của bạn"
            required
        ></textarea>
        <button type="submit" class="btn btn-success fw-bold">Gửi bình luận</button>
    </form>
    
    <div v-if="comments.length" class="mt-4 border-top pt-3">
        <h5 class="text-info">Danh sách các bình luận: </h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(comment, index) in comments" :key="index">
                <p class="mb-0"><strong>{{ comment.name}}</strong>: {{ comment.text }}</p>
            </li>
        </ul>
    </div>
  </div>
</template>

<style scoped>
/* Không bắt buộc nhưng thêm để đảm bảo CSS */
</style>