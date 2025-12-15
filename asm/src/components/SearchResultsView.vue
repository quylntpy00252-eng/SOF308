<template>
  <div class="container py-4">
    <h2 class="mb-4">
      <i class="fas fa-search me-2"></i> Kết quả tìm kiếm cho: **"{{ query }}"**
    </h2>
    <hr>
    
    <div v-if="filteredPosts.length > 0">
      <p class="text-muted">Tìm thấy **{{ filteredPosts.length }}** bài viết phù hợp.</p>
      
      <div v-for="post in filteredPosts" :key="post.id" class="card post-card mb-4 shadow-sm">
        <div class="row g-0">
          
          <div class="col-md-4">
            <router-link :to="`/posts/${post.id}`">
                <img 
                    :src="post.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'" 
                    class="img-fluid rounded-start post-image" 
                    :alt="post.title"
                />
            </router-link>
          </div>
          
          <div class="col-md-8">
            <div class="card-body d-flex flex-column h-100">
              
              <router-link :to="`/posts/${post.id}`" class="text-decoration-none text-dark">
                <h5 class="card-title fw-bold text-success">{{ post.title }}</h5>
              </router-link>
              
              <p class="card-subtitle mb-2 text-muted post-meta">
                Tác giả: **{{ post.author }}** | {{ post.createdAt }}
              </p>
              
              <p class="card-text text-truncate-3 flex-grow-1">
                {{ post.summary || post.content.substring(0, 180) + '...' }}
              </p>
              
              <div class="d-flex align-items-center mt-3 pt-2 border-top">
                
                <button 
                  @click="handleLike(post)" 
                  :disabled="!userStore.currentUser"
                  :class="['btn btn-sm me-2', isPostLiked(post) ? 'btn-danger' : 'btn-outline-danger']"
                  title="Thích bài viết này"
                >
                  <i :class="['fas me-1', isPostLiked(post) ? 'fa-heart' : 'fa-heart']"></i> 
                  {{ post.likes || 0 }}
                </button>

                <button 
                  @click="sharePost(post)" 
                  class="btn btn-sm btn-outline-info me-2"
                  title="Chia sẻ bài viết"
                >
                  <i class="fas fa-share-alt"></i>
                </button>

                <router-link :to="`/posts/${post.id}`" class="btn btn-sm btn-success me-2">
                  <i class="fas fa-eye me-1"></i> Xem chi tiết ({{ post.comments.length }} bình luận)
                </router-link>
                
                <template v-if="userStore.currentUser && userStore.currentUser.id === post.authorId">
                    <button class="btn btn-sm btn-warning me-2" @click="editPost(post.id)">
                        Sửa
                    </button>
                    <button class="btn btn-sm btn-danger" @click="deletePost(post.id)">
                        Xoá
                    </button>
                </template>
                
              </div>
              </div>
          </div>
        </div>
      </div>
      </div>
    
    <div v-else class="alert alert-warning" role="alert">
      <i class="fas fa-exclamation-triangle me-2"></i> Không tìm thấy bài viết nào phù hợp với từ khóa **"{{ query }}"**.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router' // ✅ Import useRouter để điều hướng
import { usePostStore, Post } from '../store/posts'
import { useUserStore } from '../store/user' // ✅ Import useUserStore

const props = defineProps<{
  query: string | string[]
}>()

const postStore = usePostStore()
const userStore = useUserStore() // Khởi tạo user store
const router = useRouter() // Khởi tạo router

// 1. Logic Lọc Bài Viết (Giữ nguyên)
const filteredPosts = computed<Post[]>(() => {
  const searchString = Array.isArray(props.query) ? props.query[0] : props.query
  return postStore.getPostsBySearchTerm(searchString || '')
})

// 2. Logic Like
const isPostLiked = (post: Post): boolean => {
    // Trả về false nếu chưa đăng nhập hoặc bài viết không có likedBy
    if (!userStore.currentUser || !post.likedBy) return false;
    
    // Kiểm tra xem ID người dùng hiện tại có trong mảng likedBy không
    return post.likedBy.includes(userStore.currentUser.id);
}

const handleLike = (post: Post) => {
    if (userStore.currentUser) {
        postStore.toggleLike(post.id, userStore.currentUser.id);
    } else {
        alert('Vui lòng đăng nhập để thích bài viết!');
        // Tùy chọn: Chuyển hướng đến trang đăng nhập
        // router.push({ name: 'Auth' });
    }
}

// 3. Logic Share
const sharePost = async (post: Post) => {
    const postUrl = `${window.location.origin}/posts/${post.id}`; // Tạo URL chi tiết bài viết
    const postTitle = post.title;

    if (navigator.share) {
        // Sử dụng Web Share API
        try {
            await navigator.share({
                title: postTitle,
                url: postUrl,
            });
        } catch (error) {
            console.error('Lỗi khi chia sẻ:', error);
        }
    } else {
        // Fallback: Copy Link
        await navigator.clipboard.writeText(postUrl);
        alert('Liên kết bài viết đã được sao chép vào clipboard!');
    }
}

// 4. Logic Sửa/Xóa (Cần thiết cho nút Sửa/Xóa)
const editPost = (postId: number) => {
    router.push({ name: 'CreatePost', query: { editId: postId } });
}

const deletePost = (postId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
        postStore.deletePost(postId);
        alert('Bài viết đã được xóa thành công!');
    }
}

// Load posts khi component được mount (nếu chưa được load)
onMounted(() => {
  if (postStore.posts.length === 0) {
    postStore.loadPosts() 
  }
})
</script>

<style scoped>
/* CSS giữ nguyên để đảm bảo định dạng đẹp */
.post-card {
    border-radius: 0.5rem;
}

.post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: calc(0.5rem - 1px);
    border-bottom-left-radius: calc(0.5rem - 1px);
}

.card-title {
    font-size: 1.25rem; /* Giảm kích thước tiêu đề để phù hợp hơn với card */
}

.post-meta {
    font-size: 0.85rem;
}

/* Kỹ thuật giới hạn 3 dòng văn bản */
.text-truncate-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>