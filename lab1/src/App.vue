<script setup lang="ts">
import Header from './components/Header.vue'; 
import AboutMeCard from './components/AboutMeCard.vue';
import CategoryList from './components/CategoryList.vue';
import MainContent from './components/MainContent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
    <div class="container mt-4">
        <div class="row">
            
            <article class="col-md-8">
                <BlogPostDetail /> 
            </article>
            
            <aside class="col-md-4">
                <AboutMeCard />  
                <CategoryList />
            </aside>
            
        </div>
    </div>
    </template>