<script setup>
import { ref, computed } from 'vue';

const averageScore = ref(null);

const rank = computed(() => {
  if (averageScore.value === null || averageScore.value === '') {
    return 'Chưa nhập điểm';
  }
  
  const score = parseFloat(averageScore.value);
  
  
  if (score < 0 || score > 10) {
    return 'Lỗi: Điểm phải từ 0 đến 10'; 
  }
  // ------------------------------------------
  
  if (score < 5.0) return 'Yếu';
  if (score < 6.5) return 'Trung bình';
  if (score < 8.0) return 'Khá';
  if (score < 9.0) return 'Giỏi';
  return 'Xuất sắc'; // Điểm >= 9.0 (và đã được kiểm tra là <= 10)
});
</script>

<template>
  <div class="my-4 p-4 border rounded shadow-sm bg-white">
    <h3 class="mb-4 text-primary">Bài 1: Xếp loại học sinh </h3>
    <div class="row">
      <div class="col-md-6">
        <label for="scoreInput" class="form-label fw-bold">Nhập điểm trung bình (0 - 10):</label>
        <input type="number" id="scoreInput" class="form-control" v-model.number="averageScore" min="0" max="10" step="0.1" placeholder="1-10" />
      </div>
    </div>
    <div class="mt-4 p-3 border rounded" v-if="averageScore !== null && averageScore !== ''">
      <p class="mb-0 fs-5">
        Xếp loại: 
        
        <span v-if="rank.startsWith('Lỗi')" class="fw-bolder text-danger">
            {{ rank }}
        </span>

        <span 
          v-else
          :class="{ 
            'text-danger': averageScore < 5.0, 
            'text-warning': averageScore >= 5.0 && averageScore < 6.5, 
            'text-info': averageScore >= 6.5 && averageScore < 8.0, 
            'text-success': averageScore >= 8.0 
          }"
          class="fw-bolder"
        >
          {{ rank }}
        </span>
        **
      </p>
    </div>
  </div>
</template>