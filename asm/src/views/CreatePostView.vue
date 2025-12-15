<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h3 class="mb-3">{{ editMode ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}</h3>
      <form @submit.prevent="submitPost">
        <div class="mb-3">
          <label class="form-label">Tiêu đề</label>
          <input v-model="title" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Phân loại (Category)</label>
          <input v-model="category" type="text" class="form-control" placeholder="Ví dụ: Công nghệ, Du lịch, Ẩm thực" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Nội dung</label>
          <textarea v-model="content" class="form-control" rows="5" required></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">URL Hình ảnh</label>
          <input v-model="imageUrl" type="text" class="form-control" placeholder="Nhập URL hình ảnh" />
        </div>

        <div v-if="imageUrl" class="mb-3 text-center">
          <img :src="imageUrl" class="img-fluid rounded shadow-sm" style="max-height: 300px;" alt="Preview ảnh" />
        </div>

        <button class="btn w-100" style="background-color: #198754; color:white;">
          {{ editMode ? 'Cập nhật bài viết' : 'Đăng bài' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostStore } from '../store/posts'
import { useUserStore } from '../store/user'
import { useRouter, useRoute } from 'vue-router'

const postStore = usePostStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// State
const title = ref('')
const content = ref('')
const imageUrl = ref('')
const category = ref('') // ✅ State Category Mới
const editMode = ref(false)

// Load posts từ localStorage
postStore.loadPosts()

if (!userStore.currentUser) {
  alert('Vui lòng đăng nhập trước!')
  router.push('/auth')
}

// Edit mode logic
const editId = route.query.editId ? Number(route.query.editId) : null
onMounted(() => {
  if (editId) {
    const post = postStore.posts.find(p => p.id === editId)
    if (post) {
      if (post.authorId !== userStore.currentUser!.id) {
        alert('Bạn không có quyền chỉnh sửa bài viết này!')
        router.push('/')
        return
      }
      title.value = post.title
      content.value = post.content
      imageUrl.value = post.imageUrl || ''
      category.value = post.category || '' // ✅ Load Category
      editMode.value = true
    }
  }
})

const submitPost = () => {
  if (!userStore.currentUser) return

  const user = userStore.currentUser
  const postCategory = category.value.trim() || 'Chung' // Mặc định là 'Chung' nếu trống

  if (editMode.value && editId) {
    // CHỈNH SỬA
    postStore.editPost(editId, {
      title: title.value,
      content: content.value,
      imageUrl: imageUrl.value,
      category: postCategory, // ✅ Cập nhật Category
    })
    alert('Cập nhật bài viết thành công!')
  } else {
    // TẠO MỚI
    const newPost = {
      id: Date.now(),
      title: title.value,
      content: content.value,
      author: user.name,
      authorId: user.id,
      createdAt: new Date().toLocaleString(),
      imageUrl: imageUrl.value,
      comments: [],
      category: postCategory, // ✅ Thêm Category
    }
    postStore.addPost(newPost)
    alert('Đăng bài viết mới thành công!')
  }
  router.push('/')
}
</script>