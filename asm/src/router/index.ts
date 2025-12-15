// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import ProfileView from '../views/ProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import CategoryView from '../views/CategoryView.vue' 
// ✅ IMPORT COMPONENT KẾT QUẢ TÌM KIẾM
import SearchResultsView from '../components/SearchResultsView.vue' 

const routes = [
  // 1. HOME
  { path: '/', name: 'Home', component: HomeView },
  
  // 2. AUTHENTICATION
  { path: '/auth', name: 'Auth', component: AuthView }, 
  { path: '/login', redirect: '/auth' },
  { path: '/register', redirect: '/auth' },

  // 3. POSTS
  { path: '/posts/create', name: 'CreatePost', component: CreatePostView, meta: { requiresAuth: true } },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetailView },

  // 4. USER PROFILE
  { path: '/profile', name: 'Profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/profile/edit', name: 'EditProfile', component: EditProfileView, meta: { requiresAuth: true } },

  // 5. CATEGORY
  { path: '/category/:name', name: 'Category', component: CategoryView, props: true },

  // ✅ 6. SEARCH ROUTE (ROUTE ĐÃ BỔ SUNG)
  { 
    path: '/search', 
    name: 'Search', 
    component: SearchResultsView,
    // Truyền query parameter 'q' (từ khóa tìm kiếm) dưới dạng prop 'query' cho component SearchResultsView
    props: (route) => ({ query: route.query.q }) 
  } 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Đảm bảo cuộn lên đầu trang mỗi khi chuyển route
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

// Route guard cơ bản
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'Auth' })
  }
  
  next()
})

export default router