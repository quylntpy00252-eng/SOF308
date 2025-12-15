<script setup lang="ts">
import { watchEffect } from 'vue' // ✅ Sử dụng watchEffect để theo dõi thay đổi theme
import { useThemeStore } from './store/theme' 
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
// ... Thêm các import khác (useUserStore, usePostStore) nếu cần

const themeStore = useThemeStore()

// ✅ LOGIC TỐI ƯU: Theo dõi theme và áp dụng class/attribute lên thẻ <html>
watchEffect(() => {
  const htmlEl = document.documentElement;
  const isDark = themeStore.isDarkMode;

  // 1. Áp dụng custom class cho CSS variables
  if (isDark) {
    htmlEl.classList.add('dark-mode');
  } else {
    htmlEl.classList.remove('dark-mode'); 
  }

  // 2. Áp dụng Bootstrap theme attribute (Quan trọng cho Bootstrap 5.3+)
  htmlEl.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
});

</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style>
/* -------------------------------------\
   1. CSS Variables (Biến CSS) - Tăng độ tương phản
---------------------------------------- */
:root {
  /* Default: LIGHT MODE */
  --color-brand: #029297; /* Màu xanh lá thương hiệu */
  --color-background-primary: #ffffff;
  --color-background-secondary: #f8f9fa; 
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  --color-border: #dee2e6;
  --color-shadow: rgba(0, 0, 0, 0.1);
}

.dark-mode {
  /* DARK MODE OVERRIDE - Độ tương phản cao hơn */
  --color-brand: #00c6dc; /* Màu xanh thương hiệu sáng hơn trên nền tối */
  --color-background-primary: #121212;
  --color-background-secondary: #1e1e1e; 
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #a0a0a0;
  --color-border: #333333;
  --color-shadow: rgba(0, 0, 0, 0.5);
}

/* -------------------------------------\
   2. Apply to Global Elements - Cải thiện Aesthetics
---------------------------------------- */
#app {
  min-height: 100vh;
  /* ✅ Thêm font-family chuẩn cho hệ thống */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  transition: background-color 0.4s, color 0.4s; /* ✅ Transition mượt mà hơn */
}

/* -------------------------------------\
   3. Apply to Bootstrap/Component Classes
---------------------------------------- */

/* Card, Box - Tăng cường bóng đổ */
.card, .shadow-sm {
  background-color: var(--color-background-secondary) !important;
  color: var(--color-text-primary) !important;
  border-color: var(--color-border) !important;
  
  /* ✅ Bóng đổ nổi bật hơn, mượt mà hơn */
  box-shadow: 0 0.25rem 0.75rem var(--color-shadow) !important; 
}

/* Text */
.text-muted {
  color: var(--color-text-secondary) !important;
}

/* Input/Textarea - Tương thích Dark Mode */
input, textarea {
  background-color: var(--color-background-primary) !important;
  color: var(--color-text-primary) !important;
  border-color: var(--color-border) !important;
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* ✅ Hiệu ứng Focus Input/Textarea */
input:focus, textarea:focus {
  border-color: var(--color-brand) !important;
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.4) !important; /* Dùng màu xanh lá mờ */
}

/* Link - Thẩm mỹ hơn */
a {
  color: var(--color-text-primary);
  text-decoration: none; 
  transition: color 0.2s, opacity 0.2s;
}

a:hover {
  color: var(--color-brand); /* Dùng màu thương hiệu */
  opacity: 0.9; /* Hiệu ứng mờ nhẹ */
}

/* Các tiêu đề (h1-h6) */
h1, h2, h3, h4, h5, h6 {
    color: var(--color-text-primary);
}

/* ✅ Đảm bảo ảnh luôn responsive và đẹp */
img {
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}
</style>