<script setup>
import { ref } from 'vue';
const month = ref(null);
</script>

<template>
  <div class="my-4 p-4 border rounded shadow-sm bg-white">
    <h3 class="mb-4 text-primary">Bài 2: Nhập tháng và in ra mùa </h3>
    <div class="row">
      <div class="col-md-6">
        <label for="monthInput" class="form-label fw-bold">Nhập tháng của bạn (1 - 12):</label>
        <input type="number" id="monthInput" class="form-control" v-model.number="month" min="1" max="12" placeholder="1-12" />
      </div>
    </div>

    <div class="mt-4 p-3 border rounded">
      <p class="mb-0 fs-5 fw-bold">
        <span v-if="month === null || month === ''">Vui lòng nhập tháng để xem kết quả</span>
        <span v-else-if="month < 1 || month > 12" class="text-danger">Vui lòng nhập tháng từ 1 đến 12!</span>
        
        <span v-else-if="month >= 1 && month <= 3" class="text-success">Mùa Xuân </span>
        <span v-else-if="month <= 6" class="text-danger">Mùa Hè </span>
        <span v-else-if="month <= 9" class="text-primary">Mùa Thu </span>
        <span v-else class="text-info">Mùa Đông </span>
      </p>
    </div>
  </div>
</template>