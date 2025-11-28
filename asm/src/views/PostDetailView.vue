<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4" style="background-color: #d4edda;">
      <h2>{{ post.title }}</h2>
      <p class="text-muted">Tác giả: {{ post.author }} | {{ post.createdAt }}</p>

      <!-- Ảnh bài viết -->
      <img v-if="post.imageUrl" :src="post.imageUrl" class="img-fluid mb-3 rounded shadow-sm" style="max-height: 400px; object-fit: cover;" alt="post image" />

      <p>{{ post.content }}</p>

      <hr />

      <!-- Nút Sửa/Xoá -->
      <div class="mb-3">
        <button
          v-if="userStore.currentUser && userStore.currentUser.id === post.authorId"
          @click="editPost"
          class="btn btn-warning btn-sm me-2"
        >
          Sửa
        </button>
        <button
          v-if="userStore.currentUser && userStore.currentUser.id === post.authorId"
          @click="deletePost"
          class="btn btn-danger btn-sm"
        >
          Xoá
        </button>
      </div>

      <!-- Bình luận -->
      <h5>Bình luận</h5>
      <div v-if="post.comments.length === 0" class="mb-2">Chưa có bình luận nào.</div>
      <div v-for="(comment, index) in post.comments" :key="index" class="mb-2 p-2" style="background-color: #e9f7ef; border-radius: 5px;">
        <strong>{{ comment.user }}</strong> <small class="text-muted">({{ comment.createdAt }})</small>
        <p class="mb-0">{{ comment.content }}</p>
      </div>

      <!-- Form thêm bình luận -->
      <form @submit.prevent="addComment" class="mt-3">
        <div class="mb-3">
          <textarea v-model="newComment" class="form-control" rows="3" placeholder="Viết bình luận..." required></textarea>
        </div>
        <button class="btn" style="background-color: #198754; color:white;">Bình luận</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '../store/posts'
import { useUserStore } from '../store/user'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const userStore = useUserStore()

const newComment = ref('')

// Load bài viết từ store
const postId = Number(route.params.id)
const post = computed(() => {
  return postStore.posts.find(p => p.id === postId) || {
    id: 0,
    title: 'Không tìm thấy bài viết',
    content: '',
    author: '',
    authorId: 0,
    imageUrl: '',
    createdAt: '',
    comments: []
  }
})

// Thêm bình luận
const addComment = () => {
  if (!newComment.value.trim()) return

  const commentUser = userStore.currentUser ? userStore.currentUser.name : 'Người dùng'

  postStore.addComment(postId, {
    user: commentUser,
    content: newComment.value,
    createdAt: new Date().toLocaleString()
  })

  newComment.value = ''
}

// Sửa bài viết
const editPost = () => {
  router.push({ name: 'CreatePost', query: { editId: post.value.id.toString() } })
}

// Xoá bài viết
const deletePost = () => {
  if (confirm('Bạn có chắc muốn xoá bài viết này?')) {
    postStore.deletePost(post.value.id)
    alert('Xoá bài viết thành công!')
    router.push('/')
  }
}

// Load posts từ localStorage khi mở trang
onMounted(() => {
  postStore.loadPosts()
})
</script>
