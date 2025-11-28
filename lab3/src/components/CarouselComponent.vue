<script setup lang="ts">
// Dữ liệu cho các slides của Carousel
const slides = [
    { 
        id: 1, 
        src: 'https://placehold.co/1200x400/00a79a/ffffff?text=Slide+1%3A+Energy+Pilates', 
        alt: 'Energy Pilates - Slide 1',
        title: 'Bắt đầu hành trình khỏe mạnh của bạn',
        caption: 'Tìm kiếm sự cân bằng và năng lượng trong mỗi động tác Pilates.'
    },
    { 
        id: 2, 
        src: 'https://placehold.co/1200x400/5cb85c/ffffff?text=Slide+2%3A+Phục+hồi+Cột+sống', 
        alt: 'Phục hồi Cột sống - Slide 2',
        title: 'Phục hồi cột sống với Pilates',
        caption: 'Các bài tập nhẹ nhàng, hiệu quả giúp cải thiện tư thế và giảm đau.'
    },
    { 
        id: 3, 
        src: 'https://placehold.co/1200x400/1e88e5/ffffff?text=Slide+3%3A+Cộng+đồng', 
        alt: 'Cộng đồng - Slide 3',
        title: 'Tham gia cộng đồng Energy Pilates',
        caption: 'Cùng nhau chia sẻ kinh nghiệm và động lực tập luyện.'
    },
];
</script>

<template>
    <div id="mainCarousel" class="carousel slide mb-4 shadow-lg" data-bs-ride="carousel">
        
        <div class="carousel-indicators">
            <button 
                v-for="(slide, index) in slides" 
                :key="slide.id"
                type="button" 
                data-bs-target="#mainCarousel" 
                :data-bs-slide-to="index" 
                :class="{ active: index === 0 }" 
                :aria-current="index === 0 ? 'true' : undefined"
                :aria-label="'Slide ' + (index + 1)"
            ></button>
        </div>

        <div class="carousel-inner">
            <div 
                v-for="(slide, index) in slides" 
                :key="slide.id" 
                class="carousel-item" 
                :class="{ active: index === 0 }"
                data-bs-interval="5000"
            >
                <img 
                    :src="slide.src" 
                    class="d-block w-100" 
                    :alt="slide.alt" 
                    style="height: 400px; object-fit: cover;"
                >
                
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                    <h5>{{ slide.title }}</h5>
                    <p class="mb-0">{{ slide.caption }}</p>
                </div>
            </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>