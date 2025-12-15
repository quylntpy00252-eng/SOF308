<script setup>
import { ref } from 'vue';

const items = ref([
  {
    image: 'https://picsum.photos/400/250?random=1', 
    title: '8 loại rau củ quả giàu canxi',
    content: 'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi thông qua các loại rau củ quả,...'
  },
  {
    image: 'https://picsum.photos/400/250?random=2', 
    title: 'Các loại gia vị tốt cho sức khỏe',
    content: 'Một số loại gia vị cung cấp nhiều polyphenol chống oxy hóa cao hơn các loại gia vị quen thuộc khác....'
  },
  {
    image: 'https://picsum.photos/400/250?random=3', 
    title: '9 loại đậu bổ dưỡng nên dùng nhiều',
    content: 'Đậu làng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cùng nhiều vitamin và khoáng chất giúp...'
  }
]);
</script>

<template>
  <div class="my-4 p-4 border rounded shadow-sm bg-white">
    <h3 class="mb-4 text-primary">Bài 3: Danh sách Bài viết </h3>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(item, index) in items" :key="index">
        <div class="card h-100 shadow-sm border-0">
          <img :src="item.image" class="card-img-top" alt="Hình ảnh" style="height: 180px; object-fit: cover;" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-success">{{ item.title }}</h5>
            <p class="card-text text-muted flex-grow-1">{{ item.content }}</p>
            <button class="btn btn-info btn-sm mt-auto">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>