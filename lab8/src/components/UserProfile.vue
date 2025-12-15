<template>
  <div class="row">
    <div class="col-md-3">
      <div class="list-group">
        <router-link :to="{ name: 'UserProfileInfo' }" class="list-group-item list-group-item-action">
          Thông tin cơ bản
        </router-link>
        <router-link :to="{ name: 'UserProfileSettings' }" class="list-group-item list-group-item-action">
          Cài đặt người dùng
        </router-link>
      </div>
    </div>
    <div class="col-md-9">
      <h2>👤 Trang thông tin người dùng</h2>
      <router-view /> 
    </div>
  </div>
</template>