<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4 col-md-6 mx-auto edit-profile-card"> 
      <h3 class="mb-3 text-success"><i class="fas fa-user-edit me-2"></i> Cập nhật thông tin cá nhân</h3>

      <form @submit.prevent="updateProfile">
        <div class="mb-4 text-center">
          <img
            :src="avatarUrl || 'https://via.placeholder.com/150'"
            class="rounded-circle shadow-lg border border-success border-3 profile-avatar"
            alt="avatar"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Tên</label>
          <input v-model="name" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu mới (Bỏ trống nếu không đổi)</label>
          <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu mới" />
        </div>

        <div class="mb-3">
          <label class="form-label">URL ảnh đại diện</label>
          <input v-model="avatarUrl" type="text" class="form-control" placeholder="https://..." />
        </div>

        <button class="btn w-100 btn-success">
            <i class="fas fa-save me-2"></i> Cập nhật thông tin
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// ✅ Sửa lỗi import: `user` type không tồn tại, phải là `User`
import { useUserStore, User } from '../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// ================= GUARD =================
if (!userStore.currentUser) {
  alert('Vui lòng đăng nhập để cập nhật thông tin!')
  router.push('/auth')
}

// State form
const name = ref('')
const email = ref('')
const password = ref('') // Mật khẩu mới, chỉ cập nhật nếu có giá trị
const avatarUrl = ref('')

// Load thông tin user khi mở trang
onMounted(() => {
  if (userStore.currentUser) {
    name.value = userStore.currentUser.name
    email.value = userStore.currentUser.email
    avatarUrl.value = userStore.currentUser.avatarUrl || ''
  }
})

// Cập nhật thông tin user
const updateProfile = () => {
  // ✅ Sửa lỗi type: Dùng `Partial<User>`
  const updatedData: Partial<User> = {
    name: name.value,
    email: email.value,
    avatarUrl: avatarUrl.value,
  }

  // Chỉ cập nhật password nếu người dùng nhập mật khẩu mới
  if (password.value) {
    updatedData.password = password.value
  }

  userStore.updateUser(updatedData)
  alert('Cập nhật hồ sơ thành công!')
  router.push('/profile')
}
</script>

<style scoped>
/* Tùy chỉnh Avatar */
.profile-avatar {
  width: 150px; 
  height: 150px; 
  object-fit: cover;
}

/* * ✅ Ghi chú: Card nền #d4edda đã được loại bỏ. 
 * Card sẽ tự động sử dụng --color-background-secondary
 * (Màu trắng xám nhạt trong Light Mode và xám đậm trong Dark Mode) 
 * để đảm bảo giao diện thống nhất.
 */
.edit-profile-card {
    border-radius: 12px;
}
</style>