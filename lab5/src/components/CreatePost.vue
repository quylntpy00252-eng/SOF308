<template>
  <div class="p-4 bg-light rounded shadow-sm mb-4">
    <h3 class="mb-3">Tạo bài viết mới</h3>
    
    <div v-if="errorMessage" class="alert alert-danger mb-3">
        {{ errorMessage }}
    </div>

    <div class="mb-3">
        <input v-model="title" placeholder="Tiêu đề bài viết" type="text" class="form-control" />
    </div>

    <div class="mb-3">
        <input v-model="author" placeholder="Tên tác giả" type="text" class="form-control" />
    </div>

    <div class="mb-3">
        <textarea v-model="content" placeholder="Nội dung bài viết" class="form-control" rows="3"></textarea>
    </div>

    <button @click="submitPost" 
            :class="{'btn-primary': isFormValid, 'btn-secondary': !isFormValid}" class="btn">
        Đăng bài
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['add-post'])


const title = ref('')
const content = ref('')
const author = ref('')
const errorMessage = ref(null); // Biến mới để lưu thông báo lỗi

// 💡 Computed property để kiểm tra form có hợp lệ (tất cả các trường đều có nội dung)
const isFormValid = computed(() => {
    return title.value.trim() !== '' && content.value.trim() !== '' && author.value.trim() !== '';
});

function submitPost() {
  // 1. Kiểm tra tính hợp lệ
  if (!isFormValid.value) {
    // Nếu form không hợp lệ, thiết lập thông báo lỗi và DỪNG hàm
    errorMessage.value = 'Vui lòng nhập đầy đủ Tiêu đề, Tên tác giả và Nội dung bài viết.';
    return; 
  }

  // 2. Nếu form hợp lệ:
  // Reset thông báo lỗi
  errorMessage.value = null; 

  const newPost = {
    title: title.value,
    content: content.value,
    author: author.value,
    backgroundColor: `hsl(${Math.random() * 360}, 100%, 95%)`, 
    textColor: 'black', 
  }

  // Emit sự kiện và reset fields
  emit('add-post', newPost)
  title.value = ''
  content.value = ''
  author.value = ''
}
</script>