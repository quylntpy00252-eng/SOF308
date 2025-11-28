<script setup lang="ts">
import RegistrationForm from './RegistrationForm.vue';
import LoginForm from './LoginForm.vue';
</script>

<template>
    <div class="auth-tabs border p-3 rounded bg-light">
        <h3 class="text-center mb-4">Bài 3: Tabs Đăng ký/Đăng nhập</h3>
        
        <ul class="nav nav-tabs" id="authTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button 
                    class="nav-link active" 
                    id="register-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#register" 
                    type="button" 
                    role="tab" 
                    aria-controls="register" 
                    aria-selected="true"
                >
                    Đăng ký
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button 
                    class="nav-link" 
                    id="login-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#login" 
                    type="button" 
                    role="tab" 
                    aria-controls="login" 
                    aria-selected="false"
                >
                    Đăng nhập
                </button>
            </li>
        </ul>

        <div class="tab-content border border-top-0 p-3 bg-white">
            <div 
                class="tab-pane fade show active" 
                id="register" 
                role="tabpanel" 
                aria-labelledby="register-tab"
            >
                <RegistrationForm /> 
            </div>

            <div 
                class="tab-pane fade" 
                id="login" 
                role="tabpanel" 
                aria-labelledby="login-tab"
            >
                <LoginForm />
            </div>
        </div>
    </div>
</template>

<style scoped>

.tab-content :deep(.p-3) { 
    padding: 1rem !important;
}
</style>