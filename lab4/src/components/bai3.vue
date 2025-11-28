<script setup lang="ts">

const items = ([
    { 
        title: '8 loại rau củ quả giàu canxi', 
        content: 'Canxi là một khoáng chất cần thiết...', 
        // image: img1
        image: 'https://placehold.co/400x250/00a79a/ffffff?text=FOOD+1'
    },
    { 
        title: 'Các loại gia vị tốt cho sức khỏe', 
        content: 'Một số loại gia vị có tác dụng hỗ trợ...',
        // image: img2 
        image: 'https://placehold.co/400x250/5cb85c/ffffff?text=FOOD+2'
    },
    { 
        title: '9 loại đậu bổ dưỡng nên ăn', 
        content: 'Các loại đậu là nguồn protein thực vật...',
        // image: img3 
        image: 'https://placehold.co/400x250/1e88e5/ffffff?text=FOOD+3'
    },
]);
</script>

<template>
    <div class="container mt-5 mb-5">
        <h1 class="text-center text-primary mb-5">
            KIẾN THỨC SỨC KHỎE CỘNG ĐỒNG
        </h1>
        
        <div class="row">
            
            <div 
                v-for="(item, index) in items" 
                :key="index" 
                class="col-sm-4 mb-4"
            >
                <div class="card shadow-sm h-100">
                    <img 
                        :src="item.image" 
                        class="card-img-top" 
                        :alt="item.title" 
                        style="height: 200px; object-fit: cover;"
                    />
                    
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title text-info fs-5 fw-bold">{{ item.title }}</h3>
                        <p class="card-text text-muted">{{ item.content }}</p>
                        
                        <button class="btn btn-info text-white mt-auto">Xem chi tiết</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>