<script setup lang="ts">
// Dữ liệu giả cho bài viết
const post = {
    title: 'Phương pháp tập Pilates giúp phục hồi chấn thương cột sống',
    summary: 'Đau lưng, thoát vị đĩa đệm là những vấn đề thường gặp. Tuy nhiên, nếu điều trị không đúng cách có thể dẫn đến nhiều biến chứng nguy hiểm.',
    tags: ['Pilates', 'Cột sống', 'Phục hồi', 'Sức khỏe'],
    author: 'TS. Trần Hoàng',
    date: '24/11/2025'
};


const steps = [
    { title: 'Tư thế Chuẩn bị (4 điểm)', content: 'Bắt đầu với tư thế 4 điểm. Vai và cổ tay của bạn phải thẳng hàng và vuông góc với thảm, lưng của bạn phải bằng phẳng và xương chậu của bạn phải cân đối.' },
    { title: 'Bước 1: Hít vào', content: 'Hít vào, vòng lưng, nâng cằm lên, mở rộng ngực.' },
    { title: 'Bước 2: Thở ra', content: 'Thở ra cong xương cụt, nâng cong lưng và đưa cằm về gần khoang ngực.' },
    { title: 'Lặp lại', content: 'Lặp đi lặp lại động tác từ 5-7 lần.' },
];

// Dữ liệu giả cho bình luận
const comments = [
    { name: 'Bình An', content: 'Bài viết rất hữu ích.', date: '2025-11-20' },
    { name: 'Minh Đức', content: 'Cảm ơn những chia sẻ bổ ích.', date: '2025-11-21' },
];
</script>

<template>
    <div class="post-detail p-4 bg-white rounded shadow-sm">
        
        <h1 class="mb-3 text-primary">{{ post.title }}</h1>
        
        <div class="d-flex justify-content-between align-items-center mb-4">
             <div class="alert alert-info py-2 m-0" role="alert">
                <i class="fa-solid fa-user me-1"></i> Tác giả: 
                <span class="fw-bold">{{ post.author }}</span> | 
                <i class="fa-solid fa-calendar-days ms-2 me-1"></i> Ngày đăng: 
                {{ post.date }}
            </div>
            
            <div>
                <span v-for="tag in post.tags" :key="tag" class="badge bg-success me-2">
                    {{ tag }}
                </span>
            </div>
        </div>

        <p class="lead text-muted">{{ post.summary }}</p>
        
        <hr>
        
        <h3 class="mt-4 mb-3 text-secondary">Phương pháp tập Pilates Cat Cow</h3>
        <div class="accordion" id="accordionSteps">
            <div v-for="(step, index) in steps" :key="index" class="accordion-item">
                <h2 class="accordion-header" :id="'heading'+index">
                    <button 
                        class="accordion-button" 
                        :class="{ 'collapsed': index !== 0 }"
                        type="button" 
                        data-bs-toggle="collapse" 
                        :data-bs-target="'#collapse'+index" 
                        :aria-expanded="index === 0 ? 'true' : 'false'" 
                        :aria-controls="'collapse'+index"
                    >
                        {{ step.title }}
                    </button>
                </h2>
                <div 
                    :id="'collapse'+index" 
                    class="accordion-collapse collapse" 
                    :class="{ 'show': index === 0 }"
                    :aria-labelledby="'heading'+index" 
                    data-bs-parent="#accordionSteps"
                >
                    <div class="accordion-body text-muted">
                        {{ step.content }}
                    </div>
                </div>
            </div>
        </div>

        <div class="my-5">
            <h4 class="text-success">Lời kết</h4>
            <p>Để đạt được kết quả tập luyện như mong muốn, bạn cần duy trì chế độ tập luyện đều đặn, thực hiện đúng động tác, kết hợp cùng chế độ ăn uống khoa học.</p>
            
            <div class="alert alert-warning mt-3" role="alert">
                <i class="fa-solid fa-triangle-exclamation me-1"></i> 
                **CẢNH BÁO:** Nếu điều trị không đúng cách có thể dẫn đến nhiều biến chứng nguy hiểm. Hãy tham khảo ý kiến chuyên gia trước khi tập.
            </div>
        </div>
        
        <hr>

        <h3 class="mb-3">Bình luận bài viết tại đây</h3>
        
        <div class="mb-4">
            <textarea class="form-control mb-2" rows="3" placeholder="Nhập bình luận của bạn"></textarea>
            <button class="btn btn-info text-white fw-bold">Gửi bình luận</button>
        </div>

        <h4 class="mb-3 text-secondary">Danh sách các bình luận: ({{ comments.length }})</h4>
        <ul class="list-group mb-4">
            <li v-for="(comment, index) in comments" :key="index" class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1 fw-bold text-dark">{{ comment.name }}:</h6>
                    <small class="text-muted">{{ comment.date }}</small>
                </div>
                <p class="mb-1 fst-italic">{{ comment.content }}</p>
            </li>
        </ul>

        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link">Trước</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Sau</a>
                </li>
            </ul>
        </nav>
        
    </div>
</template>