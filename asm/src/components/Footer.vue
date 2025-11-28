<template>
  <footer class="text-white text-center py-4" style="background-color: #198754; box-shadow: 0 -2px 4px rgba(0,0,0,0.1);">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      <p class="mb-2 mb-md-0">&copy; 2025 VueBlog. All rights reserved.</p>
      <div class="social-icons">
        <a href="#" class="text-white me-3"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="text-white me-3"><i class="fab fa-twitter"></i></a>
        <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.social-icons a {
  font-size: 1.2rem;
  transition: transform 0.2s;
}
.social-icons a:hover {
  transform: scale(1.2);
  text-decoration: none;
}
</style>
