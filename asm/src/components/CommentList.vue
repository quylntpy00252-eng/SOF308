<template>
  <div class="mt-4">
    <h5>Bình luận</h5>
    <div v-for="i in 3" :key="i" class="card mb-2 shadow-sm">
      <div class="card-body" style="background-color: #f8fff8;">
        <h6 class="card-subtitle mb-2 text-muted">User{{i}} | 2025-11-20</h6>
        <p class="card-text">Nội dung bình luận số {{i}}.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
