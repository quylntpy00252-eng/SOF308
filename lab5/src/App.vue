<template>
  <div id="app" class="container mt-5">
    <h1 class="text-center mb-4 text-primary">LAB 5</h1>
    
    <div class="nav-bar mb-4 p-3 bg-light rounded shadow-sm">
      <button @click="currentBai = 1" :class="{ 'active': currentBai === 1 }" class="btn btn-sm btn-outline-primary me-2">Bài 1</button>
      <button @click="currentBai = 2" :class="{ 'active': currentBai === 2 }" class="btn btn-sm btn-outline-primary me-2">Bài 2</button>
      <button @click="currentBai = 3" :class="{ 'active': currentBai === 3 }" class="btn btn-sm btn-outline-primary me-2">Bài 3</button>
      <button @click="currentBai = 4" :class="{ 'active': currentBai === 4 }" class="btn btn-sm btn-outline-success">Bài 4 </button>
    </div>

    <hr>

    <div class="main-content">
        <Bai1 v-if="currentBai === 1" />

        <Bai2 v-else-if="currentBai === 2" />

        <Bai3 v-else-if="currentBai === 3" />
        
        <div v-else-if="currentBai === 4">
            <h2 class="mb-4 text-success">Bài 4: Ứng dụng Blog </h2>
            <CreatePost @add-post="addPost" />
            <PostList :posts="posts" />
        </div>
        
        <div v-else class="alert alert-info mt-4 text-center">
            <h3> Lab 5</h3>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// --- I. Import các components của từng bài ---
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import CreatePost from './components/CreatePost.vue'; 
import PostList from './components/PostList.vue'; 


const currentBai = ref(0); // 0: Mặc định (chưa chọn bài nào)

// --- III. Logic Bài 4 (Blog) ---
const posts = ref([
  

]);


function addPost(post) {
  posts.value.push(post);
}
</script>

<style scoped>
/* Style chỉ áp dụng cho App.vue */
#app {
  max-width: 900px;
}
.nav-bar button {
    transition: all 0.2s;
}
.nav-bar button.active {
    background-color: #0d6efd; /* Primary */
    color: white;
    border-color: #0d6efd;
}
</style>