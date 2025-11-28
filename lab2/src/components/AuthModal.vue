<script setup lang="ts">
import AuthTabs from './AuthTabs.vue';
</script>

<template>
    <div class="modal-exercise mb-5 p-4">
        <h3 class="text-center mb-4">Bài 4: Modal Đăng ký/Đăng nhập</h3>
        
        <button type="button" class="btn btn-danger d-block mx-auto" data-bs-toggle="modal" data-bs-target="#authModal">
            Mở Modal Tài Khoản
        </button>

        <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="authModalLabel">ĐĂNG NHẬP / ĐĂNG KÝ</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body p-1">
                        <AuthTabs /> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>