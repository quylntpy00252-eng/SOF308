// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { reactive } from 'vue' // Cần import reactive để tạo trạng thái chia sẻ

// 💡 Import Components từ thư mục src/components/
import Home from '../components/Home.vue'
import BlogList from '../components/BlogList.vue'
import BlogPost from '../components/BlogPost.vue'
import UserProfile from '../components/UserProfile.vue'
import UserProfileInfo from '../components/UserProfileInfo.vue'
import UserProfileSettings from '../components/UserProfileSettings.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'


// Kiểm tra trạng thái từ localStorage khi ứng dụng khởi động
const isInitialAuth = localStorage.getItem('isLoggedIn') === 'true';

const authState = reactive({
    // Khởi tạo trạng thái isAuthenticated dựa trên localStorage
    isAuthenticated: isInitialAuth, 
    // Khởi tạo thông tin người dùng nếu đã đăng nhập
    user: isInitialAuth ? { username: localStorage.getItem('username') } : null 
});

// Đối tượng export để các Component truy cập
export const auth = {
    login(username, password) {
        // Giả lập kiểm tra tài khoản: user='admin', pass='123'
        if (username === 'admin' && password === '123') {
            authState.isAuthenticated = true;
            authState.user = { username: username }; 
            
            // 💡 LƯU TRẠNG THÁI VÀO LOCALSTORAGE
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            return true;
        }
        return false;
    },
    logout() {
        authState.isAuthenticated = false;
        authState.user = null;
        
        // 💡 XÓA TRẠNG THÁI KHỎI LOCALSTORAGE
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
    },
    state: authState
};


const routes = [
    // Route Cơ bản
    { path: '/', name: 'Home', component: Home },
    { path: '/blog', name: 'BlogList', component: BlogList },
    
    // Route Động (Yêu cầu 3b)
    { path: '/blog/:id', name: 'BlogPost', component: BlogPost },

    // Routes Lồng nhau và Alias (Yêu cầu 3a, 3e) - ĐƯỢC BẢO VỆ
    {
        path: '/profile',
        name: 'UserProfile',
        component: UserProfile,
        alias: '/me', // Alias Route /me
        meta: { requiresAuth: true }, // BẢO VỆ
        children: [ 
            { path: 'info', name: 'UserProfileInfo', component: UserProfileInfo },
            { path: 'settings', name: 'UserProfileSettings', component: UserProfileSettings }
        ]
    },
    
    // Route Đăng nhập
    { path: '/login', name: 'Login', component: Login },
    
    // Route Dashboard (Yêu cầu 3c) - ĐƯỢC BẢO VỆ
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // Nếu route yêu cầu xác thực VÀ người dùng CHƯA được xác thực (đọc từ authState)
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.state.isAuthenticated) {
        // Chuyển hướng đến trang đăng nhập
        next({ name: 'Login' })
    } else {
        // Cho phép truy cập
        next()
    }
})

export default router