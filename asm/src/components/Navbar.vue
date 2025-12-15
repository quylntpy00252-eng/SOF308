<template>
  <nav class="navbar navbar-expand-lg main-navbar">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="fas fa-wind me-2"></i> 
        <span class="text-dark-custom">ch</span>
        <span>Blog</span>
      </router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
        aria-controls="navmenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i> </button>

      <div class="collapse navbar-collapse" id="navmenu">
        
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="fas fa-home me-1"></i> Trang Chủ
            </router-link>
          </li>
          
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <i class="fas fa-tags me-1"></i> Bài Viết
            </a>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category">
                <router-link 
                  class="dropdown-item" 
                  :to="{ name: 'Category', params: { name: category } }"
                >
                  {{ category }}
                </router-link>
              </li>
              <li v-if="categories.length === 0">
                <span class="dropdown-item text-muted">Chưa có phân loại</span>
              </li>
            </ul>
          </li>
          
          <li class="nav-item" v-if="userStore.currentUser">
            <router-link class="nav-link" to="/posts/create">
              <i class="fas fa-plus-square me-1"></i> Tạo bài
            </router-link>
          </li>

          <li class="nav-item d-flex align-items-center ms-lg-3">
            <form class="d-flex" role="search" @submit.prevent="handleSearch">
              <input
                class="form-control form-control-sm me-2"
                type="search"
                placeholder="Tìm kiếm bài viết..."
                aria-label="Search"
                v-model="searchTerm"
              />
              <button class="btn btn-outline-light btn-sm" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </li>
          
        </ul>
        
        <ul class="navbar-nav ms-auto">
          
          <li class="nav-item d-flex align-items-center me-3">
            <button
              class="btn btn-sm"
              @click="themeStore.toggleTheme"
              title="Chuyển chế độ Sáng/Tối"
            >
              <i :class="themeStore.isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </button>
          </li>

          <li class="nav-item" v-if="!userStore.currentUser">
            <router-link class="nav-link" to="/auth">
              <i class="fas fa-sign-in-alt me-1"></i> Đăng nhập
            </router-link>
          </li>
          
          <li class="nav-item dropdown" v-if="userStore.currentUser">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <img
                :src="userStore.currentUser.avatarUrl || 'https://via.placeholder.com/30'"
                alt="Avatar"
                class="rounded-circle me-2 user-avatar"
              />
              {{ userStore.currentUser.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/profile">
                  <i class="fas fa-user-circle me-2"></i> Hồ sơ
                </router-link>
              </li>
              <li>
                <button class="dropdown-item" @click="logout">
                  <i class="fas fa-sign-out-alt me-2"></i> Đăng xuất
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue' 
import { useUserStore } from '../store/user'
import { usePostStore } from '../store/posts'
import { useThemeStore } from '../store/theme'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const postStore = usePostStore()
const themeStore = useThemeStore()
const router = useRouter()

const searchTerm = ref('')

// Lấy danh sách Categories từ Post Store
const categories = computed(() => {
    return postStore.getAllCategories || []; 
})

// Xử lý Đăng xuất
const logout = () => {
  userStore.logout()
  router.push('/auth')
}

// Xử lý Tìm kiếm
const handleSearch = () => {
    if (searchTerm.value.trim()) {
        // Chuyển hướng người dùng đến trang tìm kiếm với query parameter 'q'
        router.push({ name: 'Search', query: { q: searchTerm.value.trim() } })
        searchTerm.value = ''
    }
}
</script>

<style scoped>
/* 1. Main Navbar Style */
.main-navbar {
  /* ✅ Sử dụng biến thương hiệu cho nền Navbar */
  background-color: var(--color-brand) !important;
  /* ✅ Sử dụng biến shadow */
  box-shadow: 0 2px 4px var(--color-shadow); 
}

/* 2. Logo */
.navbar-brand,
.nav-link, 
.btn:not(.btn-outline-light) { /* Áp dụng cho nút Theme Toggle */
  /* ✅ Đảm bảo chữ trắng/sáng trên nền xanh lá */
  color: #fff !important; 
  transition: opacity 0.2s;
}
.navbar-brand:hover,
.nav-link:hover,
.btn:hover {
  opacity: 0.8; 
}

/* 3. Logo Custom Color (ch) */
.navbar-brand .text-dark-custom {
  /* Màu đen tương phản cao trên nền xanh lá */
  color: #000 !important; 
}

/* 4. Tùy chỉnh input tìm kiếm */
.navbar .form-control {
    /* Nền input trong suốt/mờ trên Navbar */
    background-color: rgba(255, 255, 255, 0.2) !important; 
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    color: #fff !important;
    transition: all 0.2s;
}

.navbar .form-control::placeholder {
    color: rgba(255, 255, 255, 0.7) !important;
}

.navbar .form-control:focus {
    /* Đảm bảo dễ nhìn khi focus */
    background-color: #fff !important; 
    color: #000 !important;
    border-color: #fff !important;
    box-shadow: none;
}

/* 5. Avatar */
.user-avatar {
  width: 30px; 
  height: 30px; 
  object-fit: cover;
}

/* 6. Toggler Icon */
.navbar-toggler {
    border-color: rgba(255, 255, 255, 0.3);
}
.navbar-toggler i {
    color: #fff !important;
}
</style>