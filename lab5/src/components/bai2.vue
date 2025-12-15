<template>
  <div class="p-5">
    <h2>Bài 2: Two-way Data Binding</h2>
    <input 
      v-model="userInput" 
      placeholder="Nhập dữ liệu vào đây"
      class="form-control w-50 mb-3" 
    />
    
    <p>Giá trị bạn nhập: <strong>{{ userInput }}</strong></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khởi tạo biến reactive 'userInput' với giá trị mặc định là 'FPL' 
const userInput = ref('FPL');
</script>