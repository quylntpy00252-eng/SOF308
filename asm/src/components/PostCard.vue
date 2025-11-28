<template>
  <div class="col-md-4 mb-4">
    <div class="card shadow-sm h-100">
      <!-- Ảnh bài viết -->
      <img v-if="post.imageUrl" :src="post.imageUrl" class="card-img-top" style="height:200px; object-fit:cover;" alt="post image" />

      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text text-muted">
          Tác giả: {{ post.author }} | {{ post.createdAt }}
        </p>
        <p class="card-text">{{ post.content.slice(0, 100) }}...</p>
        <p class="text-muted mb-2">Bình luận: {{ post.comments.length }}</p>

        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" class="btn btn-primary btn-sm me-2">
          Xem chi tiết
        </router-link>

        <!-- Nút Sửa/Xoá chỉ hiện với tác giả -->
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useUserStore } from '../store/user'
import { usePostStore } from '../store/posts'
import { useRouter } from 'vue-router'

const props = defineProps<{ post: any }>()

const userStore = useUserStore()
const postStore = usePostStore()
const router = useRouter()

const editPost = () => {
  router.push({ name: 'CreatePost', query: { editId: props.post.id.toString() } })
}

const deletePost = () => {
  if (confirm('Bạn có chắc muốn xoá bài viết này?')) {
    postStore.deletePost(props.post.id)
    alert('Xoá bài viết thành công!')
  }
}
</script>
