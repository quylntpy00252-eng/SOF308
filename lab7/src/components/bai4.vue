<script setup>
import { ref } from 'vue';
import LoginComponent from './LoginComponent.vue'; // Đảm bảo đúng đường dẫn
import CommentComponent from './CommentComponent.vue'; // Đảm bảo đúng đường dẫn

// Quản lý trạng thái đăng nhập và tên người dùng
const isLoggedIn = ref(false);
const loggedInUser = ref('');

// Xử lý khi nhận được sự kiện 'loggedIn' từ LoginComponent
function handleLoginSuccess(username) {
  loggedInUser.value = username;
  isLoggedIn.value = true;
}
</script>

<template>
    <div class="my-4 p-4 border rounded shadow-sm bg-white row">
        <h3 class="mb-4 text-primary text-center">Bài 4: Giao tiếp Component </h3>
        
        <div class="col-md-8 mx-auto">
            <LoginComponent v-if="!isLoggedIn" @loggedIn="handleLoginSuccess" />
            
            <CommentComponent v-else :username="loggedInUser" />
        </div>
    </div>
</template>