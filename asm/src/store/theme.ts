import { defineStore } from 'pinia'

// Khai báo interface cho Theme State
interface ThemeState {
  isDarkMode: boolean
}

// Hàm khởi tạo trạng thái từ localStorage
const loadTheme = (): boolean => {
  // Mặc định là 'false' (chế độ sáng) nếu chưa có gì
  const savedMode = localStorage.getItem('theme-mode')
  return savedMode === 'dark'
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDarkMode: loadTheme()
  }),
  
  actions: {
    // Hành động chuyển đổi mode
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      
      // Lưu trạng thái vào localStorage
      const mode = this.isDarkMode ? 'dark' : 'light'
      localStorage.setItem('theme-mode', mode)
    },
    
    // Hành động đặt mode theo giá trị
    setTheme(isDark: boolean) {
      this.isDarkMode = isDark
      const mode = isDark ? 'dark' : 'light'
      localStorage.setItem('theme-mode', mode)
    }
  }
})