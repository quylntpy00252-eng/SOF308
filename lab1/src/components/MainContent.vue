<script setup lang="ts">
// Dữ liệu giả cho danh sách bài viết
const posts = [
    { 
        id: 1, 
        title: 'Phương pháp tập Pilates giúp phục hồi chấn thương cột sống', 
        summary: 'Ngoài việc giúp duy trì vóc dáng, cải thiện sự linh hoạt, dẻo dai cho người tập, Pilates giúp cơ bắp và các khớp mọc dài hơn, kéo giãn hơn.',
        views: 16,
        imageUrl: 'https://placehold.co/400x200/5cb85c/ffffff?text=Pilates+Detail'
    },
    { 
        id: 2, 
        title: 'Biết ơn đời, đời sẽ thương ta', 
        summary: 'Thực hành lòng biết ơn là một cách mạnh mẽ để cải thiện sức khỏe tinh thần và cuộc sống tổng thể.',
        views: 30,
        imageUrl: 'https://placehold.co/400x200/1e88e5/ffffff?text=Life+Advice'
    },
    { 
        id: 3, 
        title: '9 tác dụng tuyệt vời của quả cam', 
        summary: 'Không chỉ là nguồn vitamin C dồi dào, cam còn có nhiều lợi ích sức khỏe khác mà bạn không ngờ tới.',
        views: 28,
        imageUrl: 'https://placehold.co/400x200/ff9800/ffffff?text=Nutrition'
    },
];
</script>

<template>
    <div class="main-content-section mb-4">
        <h2 class="h4 text-info blog-title pb-1 border-bottom border-info border-2">Blog của tôi</h2>
        
        <div v-for="post in posts" :key="post.id" class="card mb-4 shadow-sm border-0">
            <div class="row g-0">
                <div class="col-md-4">
                    <img 
                        :src="post.imageUrl" 
                        class="img-fluid rounded-start h-100 w-100" 
                        :alt="post.title"
                        style="object-fit: cover;"
                    >
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title text-primary fw-bold">{{ post.title }}</h5>
                        <p class="card-text small text-muted mb-2">
                            <i class="fa-solid fa-eye me-1"></i> Lượt xem: **{{ post.views }}**
                        </p>
                        <p class="card-text">{{ post.summary }}</p>
                        <a href="#" class="btn btn-sm btn-outline-info mt-2">Xem thêm</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.blog-title {
    color: #00a79a !important;
    font-weight: 600;
    margin-bottom: 0.75rem;
}
</style>