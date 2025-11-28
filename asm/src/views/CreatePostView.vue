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

const title = ref('')
const content = ref('')
const imageUrl = ref('')
const editMode = ref(false)

const postStore = usePostStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// Load posts từ localStorage khi mở
postStore.loadPosts()

if (!userStore.currentUser) {
  alert('Vui lòng đăng nhập trước!')
  router.push('/login')
}

// Edit mode
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
      editMode.value = true
    }
  }
})

const submitPost = () => {
  if (!userStore.currentUser) return

  if (editMode.value && editId) {
    postStore.editPost(editId, {
      title: title.value,
      content: content.value,
      imageUrl: imageUrl.value
    })
    alert('Cập nhật bài viết thành công!')
  } else {
    const newPost = {
      id: Date.now(),
      title: title.value,
      content: content.value,
      author: userStore.currentUser!.name,
      authorId: userStore.currentUser!.id,
      imageUrl: imageUrl.value,
      createdAt: new Date().toLocaleString(),
      comments: []
    }
    postStore.addPost(newPost)
    alert('Đăng bài thành công!')
  }

  router.push('/')
}
</script>
