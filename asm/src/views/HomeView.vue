<template>
  <div class="container mt-5">
    
    <RandomPostBanner /> 
    
    <TrendingPostsBanner />

    <h3 class="mb-4">Danh sách bài viết</h3>
    
    <div v-if="paginatedPosts.length > 0" class="row">
      <div 
        v-for="post in paginatedPosts" 
        :key="post.id" 
        class="col-sm-12 col-md-6 mb-4"
      >
        <PostCard :post="post" />
      </div>
    </div>
    <div v-else class="alert alert-info text-center" role="alert">
        Không có bài viết nào được tìm thấy!
    </div>
    
    <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
      <nav>
        <ul class="pagination shadow-sm">
          
          <li :class="['page-item', { disabled: currentPage === 1 }]">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">
                <i class="fas fa-arrow-left me-1"></i> Trước
            </a>
          </li>

          <li 
            v-for="(page, index) in visiblePages" 
            :key="index" 
            :class="['page-item', { active: currentPage === page }]"
          >
            <span v-if="page === -1" class="page-link disabled text-muted">...</span>
            
            <a 
              v-else 
              class="page-link" 
              href="#" 
              @click.prevent="goToPage(page)"
            >
              {{ page }}
            </a>
          </li>

          <li :class="['page-item', { disabled: currentPage === totalPages }]">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">
                Sau <i class="fas fa-arrow-right ms-1"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { usePostStore } from '../store/posts'
import PostCard from '../components/PostCard.vue'
import RandomPostBanner from '../components/RandomPostBanner.vue' 
import TrendingPostsBanner from '../components/TrendingPostsBanner.vue' 

const postStore = usePostStore()

// Load dữ liệu từ localStorage khi mở trang
onMounted(() => {
  postStore.loadPosts()
})

const allPosts = computed(() => postStore.getAllPosts) 

// ================= LOGIC PHÂN TRANG =================
const postsPerPage = 4 
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(allPosts.value.length / postsPerPage)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return allPosts.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// ✅ LOGIC MỚI: Chỉ hiển thị một số nút phân trang lân cận (Extended Pagination)
const maxVisiblePages = 5 
const visiblePages = computed(() => {
    const pages: (number)[] = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= maxVisiblePages) {
        // Trường hợp ít trang: hiển thị tất cả
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
    } else {
        // Trường hợp nhiều trang: hiển thị xung quanh trang hiện tại
        let start = Math.max(1, current - Math.floor(maxVisiblePages / 2))
        let end = Math.min(total, start + maxVisiblePages - 1)

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1)
        }

        // Thêm trang đầu (1)
        if (start > 1) {
            pages.push(1)
            if (start > 2) {
                pages.push(-1) // Ký hiệu cho dấu "..."
            }
        }

        // Thêm các trang lân cận
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        // Thêm trang cuối (total)
        if (end < total) {
            if (end < total - 1) {
                pages.push(-1) // Ký hiệu cho dấu "..."
            }
            pages.push(total)
        }
    }

    return pages
})


// Watch tự động lưu vào localStorage khi thay đổi
watch(
  () => postStore.posts,
  () => {
    postStore.savePosts()
    // Đảm bảo trang hiện tại không vượt quá tổng số trang mới
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value || 1;
    }
  },
  { deep: true }
)
</script>

<style scoped>
/* ======================================= */
/* TÙY CHỈNH PHÂN TRANG (PAGINATION) - SỬ DỤNG CSS VARIABLES */
/* ======================================= */

/* 1. Nút Active (Trang hiện tại) */
.pagination .page-item.active .page-link {
  /* Sử dụng biến thương hiệu để tự động đổi màu */
  background-color: var(--color-brand) !important; 
  border-color: var(--color-brand) !important;
  color: white !important; /* Luôn giữ chữ màu trắng trên nền brand */
  transition: background-color 0.3s, border-color 0.3s;
}

/* 2. Nút không Active & Kích hoạt */
.pagination .page-item:not(.active) .page-link {
  /* Tự động đổi màu chữ giữa Light/Dark */
  color: var(--color-text-primary) !important; 
  /* Tự động đổi màu nền */
  background-color: var(--color-background-primary) !important;
  border-color: var(--color-border) !important;
  transition: all 0.2s;
}

/* 3. Hiệu ứng Hover trên nút không Active */
.pagination .page-item:not(.active) .page-link:hover {
  background-color: var(--color-background-secondary) !important;
  color: var(--color-brand) !important; 
}

/* 4. Nút Disabled (Trước/Sau và dấu ...) */
.pagination .page-item.disabled .page-link,
.pagination .page-separator .page-link {
    color: var(--color-text-secondary) !important; 
    pointer-events: none;
    background-color: var(--color-background-secondary) !important;
    border-color: var(--color-border) !important;
}

/* 5. Tiêu đề "Danh sách bài viết" */
.container > h3 {
    color: var(--color-brand) !important;
    font-weight: bold;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--color-border);
}

/* Đảm bảo khoảng cách giữa các phần tử Banner */
.container > div:nth-child(2) {
    margin-bottom: 2rem; 
}
</style>