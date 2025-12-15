<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link :to="{ name: 'Home' }" class="navbar-brand">MyBlog</router-link>
        
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link">Trang chủ</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'BlogList' }" class="nav-link">Blog</router-link>
            </li>
            
            <li class="nav-item">
                <router-link :to="{ name: 'Dashboard' }" class="nav-link">Dashboard</router-link>
            </li>

            <template v-if="auth.state.isAuthenticated">
                <li class="nav-item">
                    <router-link to="/me" class="nav-link">Thông tin cá nhân</router-link>
                </li>
            </template>
          </ul>
          
          <div class="d-flex">
            <template v-if="auth.state.isAuthenticated">
                <span class="navbar-text me-3 text-white">
                    Xin chào, {{ auth.state.user.username }}
                </span>
                <button @click="handleLogout" class="btn btn-outline-light btn-sm">Đăng xuất</button>
            </template>
            <template v-else>
                <router-link :to="{ name: 'Login' }" class="btn btn-outline-light btn-sm">Đăng nhập</router-link>
            </template>
          </div>

        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view /> 
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { auth } from './router/index.js' 

const router = useRouter()

const handleLogout = () => {
    // 1. Gọi hàm logout để cập nhật trạng thái
    auth.logout(); 
    alert('Bạn đã đăng xuất thành công.');
    
    // 2. Chuyển hướng về trang chủ
    router.push({ name: 'Home' });
}
</script>

<style>
/* CSS cho Vue Router và Bootstrap */
.router-link-exact-active {
  font-weight: bold;
}
</style>