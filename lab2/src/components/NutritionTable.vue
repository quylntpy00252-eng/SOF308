<script setup lang="ts">
// Dữ liệu giả định cho các thành phần dinh dưỡng
const nutrients = [
    // [Tên thành phần, Khối lượng, Giá trị % DV]
    { name: 'Calories', weight: '200 kcal', dv: '20%' },
    { name: 'Chất Béo', weight: '9 g', dv: '14%' },
    { name: 'Chất Béo Bão Hòa', weight: '4 g', dv: '20%' },
    { name: 'Chất Đạm', weight: '8 g', dv: '16%' },
    { name: 'Chất Xơ', weight: '5 g', dv: '20%' },
];
</script>

<template>
    <div class="nutrition-container mb-5 p-4 bg-white rounded shadow-sm">
        <h3 class="text-center text-primary mb-4">Bài 1: Bảng Thành Phần Dinh Dưỡng</h3>
        
        <table class="table table-bordered table-striped table-sm align-middle text-center">
            
            <thead>
                <tr class="table-primary">
                    <th>Thành Phần</th>
                    <th>Khối Lượng</th>
                    <th>Giá Trị % DV*</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(item, index) in nutrients" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.weight }}</td>
                    <td>{{ item.dv }}</td>
                </tr>

                <tr>
                    <td colspan="3" class="table-secondary fw-bold text-start">
                        Đường: 12 g
                    </td>
                </tr>

                <tr>
                    <td rowspan="2" class="fw-bold">Vitamin</td> 
                    <td class="text-start">Vitamin C</td>
                    <td>25%</td>
                </tr>
                <tr>
                    <td class="text-start">Vitamin D</td>
                    <td>10%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>