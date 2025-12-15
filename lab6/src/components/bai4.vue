<script setup>
import { ref } from 'vue';

// Dữ liệu mẫu ban đầu (Đã sửa lỗi cú pháp trong snippet PDF)
const students = ref([
  { name: 'Nguyễn Chí Hùng', score: 8, dob: '2025-01-01' },
  { name: 'Phạm Thị Lan', score: 9, dob: '2025-05-15' }
]);

const student = ref({
  name: '', 
  score: null, 
  dob: '' 
});

let isEditing = ref(false); 
let editingIndex = ref(null); 

function resetForm() {
  student.value = {
    name: '',
    score: null,
    dob: ''
  };
  isEditing.value = false;
  editingIndex.value = null;
}

function submitForm() {
  if (isEditing.value) {
    // Cập nhật
    students.value[editingIndex.value] = { ...student.value };
  } else {
    // Thêm mới
    students.value.push({ ...student.value });
  }
  resetForm(); // Reset form sau khi hoàn tất
}

function editStudent(index) {
  // Lấy dữ liệu học sinh cần sửa
  student.value = { ...students.value[index] }; 
  isEditing.value = true;
  editingIndex.value = index;
}

function deleteStudent(index) {
  // Xóa 1 phần tử
  students.value.splice(index, 1);
}
</script>

<template>
  <div class="my-4 p-4 border rounded shadow-sm bg-white">
    <h3 class="mb-4 text-primary">Bài 4: Quản lý học sinh (CRUD)</h3>
    <div class="row">
      <form @submit.prevent="submitForm" class="col-sm-4 p-4 border rounded shadow-sm bg-light h-100">
        <h4 :class="{ 'text-warning': isEditing, 'text-success': !isEditing }">{{ isEditing ? 'Chỉnh sửa học sinh' : 'Thêm học sinh mới' }}</h4>
        <div class="mb-3">
          <label for="name" class="form-label">Họ tên:</label>
          <input type="text" class="form-control" v-model="student.name" id="name" required />
        </div>
        <div class="mb-3">
          <label for="score" class="form-label">Điểm:</label>
          <input type="number" max="10" min="0" step="0.1" class="form-control" v-model.number="student.score" id="score" required />
        </div>
        <div class="mb-3">
          <label for="dob" class="form-label">Ngày sinh:</label>
          <input type="date" class="form-control" v-model="student.dob" id="dob" required />
        </div>
        <button type="submit" :class="isEditing ? 'btn-warning' : 'btn-success'" class="btn me-2 fw-bold">
          {{ isEditing ? 'Cập nhật' : 'Thêm' }}
        </button>
        <button type="button" class="btn btn-secondary" v-if="isEditing" @click="resetForm">Hủy</button>
      </form>

      <div class="col-sm-8 p-4">
        <h4 class="text-info">Danh sách học sinh</h4>
        <table class="table table-striped table-hover table-bordered shadow-sm">
          <thead class="table-primary">
            <tr>
              <th>Họ và tên</th>
              <th>Điểm</th>
              <th>Ngày sinh</th>
              <th colspan="2" class="text-center">Thao tác</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stu, index) in students" :key="index">
              <td>{{ stu.name }}</td>
              <td>
                <span :class="{'text-danger fw-bold': stu.score < 5, 'text-success fw-bold': stu.score >= 8}">
                    {{ stu.score }}
                </span>
              </td>
              <td>{{ stu.dob }}</td>
              <td>
                <button class="btn btn-warning btn-sm" @click="editStudent(index)">Sửa</button>
              </td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteStudent(index)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="students.length === 0" class="alert alert-warning text-center">Chưa có học sinh nào trong danh sách.</div>
      </div>
    </div>
  </div>
</template>