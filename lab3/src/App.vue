<script setup lang="ts">
// ... (các import giữ nguyên)
import Header from './components/Header.vue'; 
import AboutMeCard from './components/AboutMeCard.vue';
import CategoryList from './components/CategoryList.vue';
import CarouselComponent from './components/CarouselComponent.vue';
import BlogPostDetail from './components/BlogPostDetail.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
    <div>
        <Header /> 
        
        <div class="container mt-4">
            
            <CarouselComponent /> 

            <div class="row">
                
                <aside class="col-md-4">
                    <AboutMeCard />
                    <CategoryList />
                </aside>
                
                <article class="col-md-8">
                    <BlogPostDetail />
                </article>
                
            </div>
        </div>
        
        <FooterComponent />
    </div>
</template>