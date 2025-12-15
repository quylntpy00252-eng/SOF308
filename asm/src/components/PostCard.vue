<template>
  <div class="card shadow-sm h-100 d-flex flex-row w-100 overflow-hidden post-card-hover">

    <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" class="card-image-link">
      <img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        class="img-fluid"
        style="width: 220px; height: 100%; object-fit: cover;"
        :alt="post.title"
      />
    </router-link>

    <div class="card-body d-flex flex-column w-100">

      <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" class="text-decoration-none">
        <h5 class="card-title text-primary">{{ post.title }}</h5>
      </router-link>
      <span class="badge bg-secondary mb-2">{{ post.category }}</span>

      <p class="card-text text-muted mb-2">
        Tác giả: **{{ post.author }}** | {{ post.createdAt }}
      </p>

      <p class="card-text flex-grow-1 mb-3 post-summary">
        {{ post.content.slice(0, 200) }}...
      </p>

      <div class="d-flex gap-2 align-items-center mt-auto border-top pt-2 flex-wrap">
        
        <button 
          @click="handleLike" 
          :disabled="!userStore.currentUser"
          :class="['btn btn-sm', isLiked ? 'btn-danger' : 'btn-outline-danger']"
          title="Thích bài viết này"
        >
          <i :class="['fas me-1', isLiked ? 'fa-heart' : 'fa-heart']"></i> 
          {{ post.likes || 0 }}
        </button>

        <button 
          @click="sharePost" 
          class="btn btn-sm btn-outline-info"
          title="Chia sẻ bài viết"
        >
          <i class="fas fa-share-alt"></i>
        </button>

        <router-link
          :to="{ name: 'PostDetail', params: { id: post.id } }"
          class="btn btn-primary btn-sm"
        >
          <i class="fas fa-eye me-1"></i> Xem chi tiết ({{ post.comments.length }} bình luận)
        </router-link>

        <template v-if="userStore.currentUser && userStore.currentUser.id === post.authorId">
          <div class="d-flex gap-2 ms-auto">
            <button @click="editPost" class="btn btn-warning btn-sm">
              <i class="fas fa-edit me-1"></i> Sửa
            </button>
            <button @click="deletePost" class="btn btn-danger btn-sm">
              <i class="fas fa-trash-alt me-1"></i> Xoá
            </button>
          </div>
        </template>
        
      </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore, Post } from '../store/posts'
import { useUserStore } from '../store/user'

const props = defineProps<{ post: Post }>()

const userStore = useUserStore()
const postStore = usePostStore()
const router = useRouter()

// Logic Like/Unlike
const isLiked = computed(() => {
    if (!userStore.currentUser || !props.post.likedBy) return false;
    return props.post.likedBy.includes(userStore.currentUser.id);
});

const handleLike = () => {
    if (userStore.currentUser) {
        postStore.toggleLike(props.post.id, userStore.currentUser.id);
    } else {
        alert('Vui lòng đăng nhập để thích bài viết!');
    }
}

// Logic Chia sẻ
const sharePost = async () => {
    const postUrl = `${window.location.origin}/posts/${props.post.id}`;
    const postTitle = props.post.title;

    if (navigator.share) {
        try {
            await navigator.share({
                title: postTitle,
                url: postUrl,
            });
        } catch (error) {
            console.error('Lỗi khi chia sẻ:', error);
        }
    } else {
        await navigator.clipboard.writeText(postUrl);
        alert('Liên kết bài viết đã được sao chép vào clipboard!');
    }
}

// Logic Sửa/Xóa
const editPost = () => {
  router.push({ name: 'CreatePost', query: { editId: props.post.id } })
}

const deletePost = () => {
  if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${props.post.title}" không?`)) {
    postStore.deletePost(props.post.id)
    alert('Bài viết đã được xóa thành công!')
  }
}
</script>

<style scoped>
/* CSS giữ nguyên, chỉ đảm bảo các nút hiển thị tốt */
.post-card-hover {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.post-card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
}

.card-image-link {
    display: block;
    width: 220px;
    height: 100%;
}

.post-summary {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>