<script setup lang="ts">
// Dữ liệu giả cho danh sách bài viết gần đây
const recentBlogs = [
  { title: 'Bí quyết giảm stress bằng thiền', date: '05/09/2024' },
  { title: 'Tác dụng của nước chanh ấm', date: '01/09/2024' },
  { title: 'Lợi ích của việc đi bộ 30 phút', date: '28/08/2024' },
  { title: 'Các loại hạt tốt cho tim mạch', date: '15/08/2024' },
];
</script>

<template>
  <div class="sidebar-recent-list">
    <h3 class="sidebar-title">Bài viết gần đây</h3>
    <a v-for="(blog, index) in recentBlogs" :key="index" href="#" class="recent-item">
        <span class="item-title">{{ blog.title }}</span>
        <span class="item-date">({{ blog.date }})</span>
    </a>
  </div>
</template>

<style scoped>
.sidebar-recent-list {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
    font-size: 1.4em;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
}

.recent-item {
  display: block;
  text-decoration: none;
  color: #555;
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
  font-size: 0.95em;
  transition: color 0.2s;
}

.recent-item:last-child {
    border-bottom: none;
}

.recent-item:hover {
    color: #5cb85c;
}

.item-title {
    font-weight: 500;
}

.item-date {
    font-size: 0.85em;
    color: #999;
    margin-left: 5px;
}
</style>