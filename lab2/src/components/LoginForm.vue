<template>
    <div class="p-3">
        <h4 class="mb-3 text-primary">Form Đăng nhập</h4>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="loginEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="loginEmail" placeholder="Nhập email" required>
            </div>
            
            <div class="mb-3">
                <label for="loginPassword" class="form-label">Mật Khẩu</label>
                <input type="password" class="form-control" id="loginPassword" placeholder="Nhập mật khẩu" required>
            </div>
            
            <button type="submit" class="btn btn-primary">Đăng Nhập</button>
        </form>
    </div>
</template>