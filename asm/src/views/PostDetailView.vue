<template>
  <div class="container mt-5">
    <div class="card shadow-lg p-4 col-md-8 mx-auto" style="background-color: #f0fff0;">
      <h2 class="text-primary">{{ post.title }}</h2>
      <p class="text-muted border-bottom pb-2">
        Danh mục: <span class="badge bg-secondary me-2">{{ post.category }}</span> | Tác giả: **{{ post.author }}** | Đăng ngày: {{ post.createdAt }}
      </p>

      <img v-if="post.imageUrl" :src="post.imageUrl" class="img-fluid mb-3 rounded shadow-sm" style="max-height: 400px; object-fit: cover;" alt="post image" />

      <div class="post-content mb-4" style="white-space: pre-wrap;">{{ post.content }}</div>

      <div class="d-flex align-items-center mb-4 border-top pt-3">
        
        <button 
          @click="handleLike" 
          :disabled="!userStore.currentUser || post.id === 0"
          :class="['btn me-3', isLiked ? 'btn-danger' : 'btn-outline-danger']"
          title="Thích bài viết này"
        >
          <i :class="['fas me-1', isLiked ? 'fa-heart' : 'fa-heart']"></i> 
          {{ post.likes || 0 }} Thích
        </button>

        <button 
          @click="sharePost" 
          class="btn btn-outline-info me-3"
          title="Chia sẻ bài viết"
        >
          <i class="fas fa-share-alt me-1"></i> Chia sẻ
        </button>
        
        <div class="ms-auto d-flex gap-2" v-if="isAuthor">
          <button @click="editPost" class="btn btn-warning btn-sm">
            <i class="fas fa-edit me-1"></i> Sửa
          </button>
          <button @click="deletePost" class="btn btn-danger btn-sm">
            <i class="fas fa-trash-alt me-1"></i> Xoá
          </button>
        </div>
      </div>
      <hr />

      <h5 class="text-secondary"><i class="fas fa-comments me-2"></i> Bình luận ({{ post.comments.length }})</h5>
      <div v-if="post.comments.length === 0" class="mb-4 alert alert-light">Chưa có bình luận nào.</div>
      
      <div v-else class="list-group mb-4">
        <div v-for="(comment, index) in post.comments" :key="index" class="list-group-item list-group-item-light shadow-sm mb-2">
          <p class="mb-1">
            <strong>{{ comment.user }}</strong> 
            <small class="text-muted float-end">{{ comment.createdAt }}</small>
          </p>
          <p class="mb-0">{{ comment.content }}</p>
        </div>
      </div>

      <form v-if="userStore.currentUser" @submit.prevent="addComment" class="mt-3">
        <h6>Thêm bình luận của bạn:</h6>
        <textarea 
          v-model="newComment" 
          class="form-control mb-2" 
          rows="3" 
          placeholder="Viết bình luận của bạn..."
          required
        ></textarea>
        <button type="submit" class="btn btn-primary">
            <i class="fas fa-paper-plane me-2"></i> Gửi bình luận
        </button>
      </form>
      <div v-else class="alert alert-warning mt-3">
        <router-link :to="{ name: 'Auth' }">Đăng nhập</router-link> để bình luận.
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore, Post } from '../store/posts'
import { useUserStore } from '../store/user'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const userStore = useUserStore()

const newComment = ref('')

// Load posts khi component được tạo
onMounted(() => {
    postStore.loadPosts()
})

// Lấy ID bài viết từ URL
const postId = Number(route.params.id)

// Computed bài viết
const post = computed<Post>(() => {
  // Trả về post hoặc một object post giả nếu không tìm thấy
  const foundPost = postStore.getPostById(postId)
  return foundPost || {
    id: 0,
    title: 'Không tìm thấy bài viết',
    content: 'Bài viết này có thể đã bị xóa hoặc URL không hợp lệ.',
    author: 'Unknown',
    authorId: 0,
    createdAt: new Date().toLocaleString(),
    comments: [],
    category: 'Unknown',
    likes: 0,
    likedBy: []
  } as Post // Ép kiểu để khớp với Post interface (đã có likedBy và likes)
})

// Computed kiểm tra người dùng đã thích bài viết chưa
const isLiked = computed(() => {
    // Chỉ kiểm tra nếu bài viết hợp lệ và người dùng đã đăng nhập
    if (post.value.id === 0 || !userStore.currentUser) return false
    
    // Kiểm tra ID người dùng có trong mảng likedBy không
    return post.value.likedBy.includes(userStore.currentUser.id)
})

// Computed kiểm tra tác giả
const isAuthor = computed(() => {
    return userStore.currentUser && userStore.currentUser.id === post.value.authorId
})

// ✅ XỬ LÝ LIKE/UNLIKE
const handleLike = () => {
    if (userStore.currentUser && post.value.id !== 0) {
        postStore.toggleLike(post.value.id, userStore.currentUser.id)
    }
}

// ✅ XỬ LÝ CHIA SẺ
const sharePost = async () => {
    if (post.value.id === 0) return
    
    const postUrl = window.location.href
    const postTitle = post.value.title

    if (navigator.share) {
        // Sử dụng Web Share API (cho thiết bị di động/trình duyệt hiện đại)
        try {
            await navigator.share({
                title: postTitle,
                url: postUrl,
            })
        } catch (error) {
            console.error('Lỗi khi chia sẻ:', error)
        }
    } else {
        // Fallback: Copy Link
        await navigator.clipboard.writeText(postUrl)
        alert('Liên kết bài viết đã được sao chép vào clipboard!')
    }
}

// Thêm bình luận (Giữ nguyên)
const addComment = () => {
  if (!newComment.value.trim() || post.value.id === 0) return

  const commentUser = userStore.currentUser ? userStore.currentUser.name : 'Người dùng ẩn danh'

  postStore.addComment(postId, {
    user: commentUser,
    content: newComment.value,
    createdAt: new Date().toLocaleString()
  })
  
  alert('Bình luận của bạn đã được thêm!')
  newComment.value = ''
}

// Sửa bài viết (Giữ nguyên)
const editPost = () => {
  if (post.value.id === 0) return
  router.push({ name: 'CreatePost', query: { editId: postId } })
}

// Xóa bài viết (Giữ nguyên)
const deletePost = () => {
  if (post.value.id === 0) return
  
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
    postStore.deletePost(postId)
    alert('Bài viết đã được xóa thành công!')
    router.push('/') // Quay về trang chủ
  }
}
</script>