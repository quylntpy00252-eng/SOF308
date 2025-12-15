<template>
  <div class="container mt-5">
    <div class="row">

      <div class="col-md-4 mb-4">
        <div class="card shadow-sm p-4" style="background-color: #f8f9fa;">
          <h3 class="mb-3 border-bottom pb-2 text-success">Hồ sơ của tôi</h3>

          <div class="text-center mb-3">
            <img
              :src="user.avatarUrl || 'https://via.placeholder.com/150'"
              class="rounded-circle shadow-lg"
              style="width: 150px; height: 150px; object-fit: cover;"
              alt="avatar"
            />
          </div>

          <p class="mb-1"><strong>Tên:</strong> {{ user.name }}</p>
          <p class="mb-1"><strong>Email:</strong> {{ user.email }}</p>
          <p class="mb-1">
            <strong>Tổng số bài viết:</strong>
            <span class="badge bg-success">{{ userPosts.length }}</span>
          </p>

          <div class="text-center mt-3">
            <router-link class="btn btn-warning w-100" :to="{ name: 'EditProfile' }">
              <i class="fas fa-edit me-2"></i> Chỉnh sửa thông tin
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <h3 class="mb-4 border-bottom pb-2 text-primary">Bài viết của bạn (Tổng: {{ userPosts.length }})</h3>
        
        <div v-if="totalPages > 1" class="d-flex justify-content-center mb-4">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="goToPage(currentPage - 1)">Trước</button>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="goToPage(currentPage + 1)">Sau</button>
                </li>
            </ul>
        </div>

        <div class="row">
          <div v-if="paginatedPosts.length === 0" class="col-12">
            <div class="alert alert-warning">Bạn chưa có bài viết nào.</div>
          </div>
          <div v-for="post in paginatedPosts" :key="post.id" class="col-12 mb-3">
            <PostCard :post="post" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '../store/user'
import { usePostStore } from '../store/posts'
import { useRouter } from 'vue-router'
import PostCard from '../components/PostCard.vue'

// ================= STORES =================
const userStore = useUserStore()
const postStore = usePostStore()
const router = useRouter()

// ================= GUARD (Phòng trường hợp route guard bị bỏ qua) =================
if (!userStore.currentUser) {
  alert('Vui lòng đăng nhập để xem thông tin cá nhân!')
  router.push('/auth')
}

// Lấy thông tin người dùng (đã kiểm tra null ở trên)
const user = userStore.currentUser!

// Lấy danh sách bài viết của người dùng hiện tại
const userPosts = computed(() => {
  return postStore.getUserPosts(user.id)
})

// ================= PAGINATION =================
const postsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(userPosts.value.length / postsPerPage)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return userPosts.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>