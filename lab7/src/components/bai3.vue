<script setup>
import { ref } from 'vue';

const user = ref({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    gender: 'Nam', // Giá trị mặc định
    languages: [], // Mảng cho checkbox
});

const isRegistered = ref(false);

function registerUser() {
    // Giả lập đăng ký thành công
    isRegistered.value = true;
    alert('Đăng ký thành công!');
}
</script>

<template>
  <div class="my-4 p-4 border rounded shadow-sm bg-white row">
    <h3 class="mb-4 text-primary text-center">Bài 3: Form Đăng ký </h3>
    
    <div class="col-md-6">
        <div class="p-4 border rounded shadow-sm bg-light">
            <h4 class="text-primary mb-3">Form Đăng Ký</h4>
            <form @submit.prevent="registerUser">
                <div class="mb-3">
                    <label class="form-label fw-bold">Họ tên:</label>
                    <input type="text" class="form-control" v-model="user.fullName" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Email:</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Mật khẩu:</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Ngày sinh:</label>
                    <input type="date" class="form-control" v-model="user.dob" required>
                </div>
                
                <div class="mb-3">
                    <label class="form-label fw-bold d-block">Giới tính:</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="genderNam" value="Nam" v-model="user.gender">
                        <label class="form-check-label" for="genderNam">Nam</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="genderNu" value="Nữ" v-model="user.gender">
                        <label class="form-check-label" for="genderNu">Nữ</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="genderKhac" value="Khác" v-model="user.gender">
                        <label class="form-check-label" for="genderKhac">Khác</label>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-bold d-block">Ngôn ngữ:</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="langViet" value="Tiếng Việt" v-model="user.languages">
                        <label class="form-check-label" for="langViet">Tiếng Việt</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="langAnh" value="Tiếng Anh" v-model="user.languages">
                        <label class="form-check-label" for="langAnh">Tiếng Anh</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="langNhat" value="Tiếng Nhật" v-model="user.languages">
                        <label class="form-check-label" for="langNhat">Tiếng Nhật</label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary fw-bold">Đăng ký</button>
            </form>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="p-4 border rounded shadow-sm bg-warning-subtle h-100">
            <h4 class="text-warning-emphasis mb-3">Thông tin đã đăng ký:</h4>
            <div v-if="isRegistered" class="fs-5">
                <p><strong>Họ tên:</strong> {{ user.fullName }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Ngày sinh:</strong> {{ user.dob }}</p>
                <p><strong>Giới tính:</strong> {{ user.gender }}</p>
                <p><strong>Ngôn ngữ:</strong> {{ user.languages.join(', ') || 'Chưa chọn' }}</p>
            </div>
            <div v-else class="alert alert-info mt-3">
                Thông tin sẽ hiển thị sau khi bạn nhấn "Đăng ký".
            </div>
        </div>
    </div>
  </div>
</template>