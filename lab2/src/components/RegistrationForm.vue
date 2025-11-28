<template>
    <div class="p-3">
        <h4 class="mb-3 text-success">Form Đăng Ký Thông Tin</h4>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="regName" class="form-label">Họ và Tên</label>
                <input type="text" class="form-control" id="regName" placeholder="Nhập họ và tên" required>
            </div>
            
            <div class="mb-3">
                <label for="regEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="regEmail" placeholder="Nhập email" required>
            </div>
            
            <div class="mb-3">
                <label for="regPassword" class="form-label">Mật Khẩu</label>
                <input type="password" class="form-control" id="regPassword" placeholder="Nhập mật khẩu" required>
            </div>
            <div class="mb-3">
                <label for="regPhone" class="form-label">Số Điện Thoại</label>
                 <input type="tel" class="form-control" id="regPhone" placeholder="Ví dụ: 023" required>
           </div>
            
            <div class="mb-3">
                <label class="form-label d-block">Giới Tính</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="genderMale" value="Nam" checked>
                    <label class="form-check-label" for="genderMale">Nam</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="Nữ">
                    <label class="form-check-label" for="genderFemale">Nữ</label>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="languageSelect" class="form-label">Ngôn Ngữ</label>
                <select id="languageSelect" class="form-select">
                    <option selected>Tiếng Việt</option>
                    <option>Tiếng Anh</option>
                </select>
            </div>
            
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="termsCheck" required>
                <label class="form-check-label small" for="termsCheck">
                    Tôi đồng ý với các điều khoản và điều kiện
                </label>
            </div>
            
            <button type="submit" class="btn btn-success">Đăng Ký</button>
        </form>
    </div>
</template>