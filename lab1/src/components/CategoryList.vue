<script setup lang="ts">
const categories = [
    { name: 'Chế độ tập', count: 12, active: true },
    { name: 'Chế độ dinh dưỡng', count: 15, active: false },
    { name: 'Cẩm nang cuộc sống', count: 99, active: false },
];
</script>

<template>
    <div class="category-section mb-4">
        <h2 class="h4 text-info category-title pb-1 border-bottom border-info border-2">Chuyên mục</h2>
        
        <div class="list-group shadow-sm">
            <a 
                v-for="cat in categories" 
                :key="cat.name"
                href="#" 
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                :class="{'active-category': cat.active, 'fw-bold': cat.active}"
                :aria-current="cat.active ? 'page' : undefined"
            >
                {{ cat.name }}
                <span 
                    class="badge rounded-pill category-badge"
                    :class="cat.active ? 'bg-white text-info' : 'bg-primary'"
                >
                    {{ cat.count }}
                </span>
            </a>
        </div>
    </div>
</template>

<style scoped>
.category-title {
    color: #00a79a !important; 
    font-weight: 600;
    margin-bottom: 0.75rem;
}
.active-category {
    background-color: #00a79a !important; 
    border-color: #00a79a !important;
    color: white !important; 
}
</style>