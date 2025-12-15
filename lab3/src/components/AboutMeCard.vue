<script setup lang="ts">
// Dữ liệu cá nhân
const profile = {
    title: 'Giới thiệu bản thân',
    name: 'TS. Trần Hoàng',
    org: 'Tổ chức Tư vấn sức khỏe quốc tế độc lập.',
    quote: 'Ta không được chọn nơi mình sinh ra, nhưng ta được chọn cách mình sẽ sống.',
    // Giả lập đường dẫn ảnh avatar (Thay bằng ảnh thực tế của bạn)
    avatarUrl: 'https://placehold.co/150x150/00a79a/ffffff?text=AVATAR' 
}
</script>

<template>
    <div class="about-me-section mb-4">
        <h2 class="h4 text-info about-title pb-1 border-bottom border-info border-2">Về tôi</h2>
        
        <div class="card shadow-sm border-0">
            <img 
                :src="profile.avatarUrl" 
                class="card-img-top rounded-circle p-4 mx-auto d-block" 
                alt="Avatar" 
                style="width: 150px; height: 150px; object-fit: cover; border: 4px solid #5cb85c;"
            >
            
            <div class="card-body text-center pt-0">
                <h5 class="card-title fw-bold">{{ profile.title }}</h5>
                <p class="card-text small fw-bold text-success">{{ profile.name }}</p>
                <p class="card-text small text-muted">{{ profile.org }}</p>
                
                <hr>
                
                <blockquote class="blockquote small mt-3">
                    <p class="mb-0 fst-italic text-dark">{{ profile.quote }}</p>
                    <footer class="blockquote-footer mt-1">Châm ngôn</footer>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<style scoped>

.about-title {
    color: #00a79a !important; /* Màu xanh tương thích với Header */
    font-weight: 600;
    margin-bottom: 0.75rem;
}


.card-body {
    padding-top: 0.5rem !important;
}
</style>