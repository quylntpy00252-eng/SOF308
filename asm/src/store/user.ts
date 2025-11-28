import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  token: string
  avatarUrl?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null
  }),

  actions: {
    // Đăng nhập + lưu vào localStorage
    login(user: User) {
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      localStorage.setItem('token', user.token)
    },

    // Đăng xuất + xoá localStorage
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
    },

    // Cập nhật thông tin người dùng
    updateUser(user: Partial<User>) {
      if (!this.currentUser) return
      this.currentUser = { ...this.currentUser, ...user }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    }
  }
})
