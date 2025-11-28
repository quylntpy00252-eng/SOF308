<script setup lang="ts">
// Dữ liệu cho các mục điều hướng chính
const navItems = [
    { name: 'Bài viết', icon: 'fa-solid fa-list' },
    { name: 'Video', icon: 'fa-solid fa-film' },
    { name: 'Giới thiệu', icon: 'fa-solid fa-circle-info' },
    { name: 'Sự kiện', icon: 'fa-solid fa-calendar-days' },
    // Mục Tài khoản sử dụng Dropdown
    { 
        name: 'Tài khoản', 
        icon: 'fa-solid fa-user', 
        dropdown: true,
        items: ['Đăng nhập', 'Đăng ký']
    },
];

// Dữ liệu cho phần chọn ngôn ngữ
const langItems = [
    { name: 'Tiếng Việt' },
    { name: 'Tiếng Anh' },
];
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div class="container">
                
                <a class="navbar-brand fw-bold text-info" href="#">
                    <i class="fa-solid fa-bolt me-2"></i> Energy Pilates
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <template v-for="item in navItems" :key="item.name">
                            
                            <li v-if="item.dropdown" class="nav-item dropdown">
                                <a 
                                    class="nav-link dropdown-toggle" 
                                    href="#" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <i :class="[item.icon, 'me-1']"></i> {{ item.name }}
                                </a>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li v-for="subItem in item.items" :key="subItem">
                                        <a class="dropdown-item" href="#">{{ subItem }}</a>
                                    </li>
                                </ul>
                            </li>
                            
                            <li v-else class="nav-item">
                                <a class="nav-link" href="#">
                                    <i :class="[item.icon, 'me-1']"></i> {{ item.name }}
                                </a>
                            </li>
                            
                        </template>
                    </ul>

                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a 
                                class="nav-link dropdown-toggle active" 
                                href="#" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                <i class="fa-solid fa-globe me-1"></i> Tiếng Việt
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                                <li v-for="lang in langItems" :key="lang.name">
                                    <a class="dropdown-item" href="#">{{ lang.name }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
.navbar-nav .nav-link {
    font-weight: 500;
}
.navbar-brand {
    font-size: 1.5rem;
}
</style>