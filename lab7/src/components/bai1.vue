<script setup>
import { ref } from 'vue';

const newToDo = ref('');
const jobs = ref(['Ăn sáng', 'Đi học', 'Chơi bóng rổ']);

// Thêm công việc
const addList = () => {
  if (newToDo.value.trim()) { // Kiểm tra chuỗi không rỗng
    jobs.value.push(newToDo.value.trim());
    newToDo.value = ''; // Reset input field
  }
};

// Xóa công việc
const removeList = (index) => {
  jobs.value.splice(index, 1);
};
</script>

<template>
  <div class="my-4 p-4 border rounded shadow-sm bg-white row">
    <div class="col-md-6 mx-auto">
        <h3 class="mb-4 text-primary text-center">Bài 1: Quản lý công việc </h3>
        
        <form @submit.prevent="addList" class="p-3 border rounded shadow-sm bg-light mb-4">
            <div class="mb-3">
                <label for="jobName" class="form-label fw-bold">Tên công việc:</label>
                <input 
                    type="text" 
                    id="jobName" 
                    class="form-control" 
                    v-model="newToDo" 
                    placeholder="Nhập tên công việc"
                >
            </div>
            <button type="submit" class="btn btn-primary fw-bold">Thêm công việc</button>
        </form>

        <h4 class="text-info mt-4">Danh sách công việc:</h4>
        <ul class="list-group">
            <li 
                class="list-group-item d-flex justify-content-between align-items-center" 
                v-for="(job, index) in jobs" 
                :key="index"
            >
                <span class="fw-medium">{{ job }}</span>
                <button class="btn btn-danger btn-sm" @click="removeList(index)">Xóa</button>
            </li>
            <li v-if="jobs.length === 0" class="list-group-item text-center text-muted">Không có công việc nào.</li>
        </ul>
    </div>
  </div>
</template>