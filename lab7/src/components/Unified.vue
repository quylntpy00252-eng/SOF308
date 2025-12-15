<script setup>
import CommentComponent from './CommentComponent.vue';

// Nhận username từ App.vue
const props = defineProps({
  username: {
    type: String,
    required: true
  }
});
</script>

<template>
    <div class="my-4 p-4 border rounded shadow-sm bg-white row">
        <h3 class="mb-4 text-danger text-center">Bài 4: Tích hợp Props </h3>
        
        <div class="col-md-8 mx-auto">
            <CommentComponent :username="props.username" />
        </div>
    </div>
</template>