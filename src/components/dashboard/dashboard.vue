<script setup>
import NavBar from './elements/navbar.vue';
import SideBar from './elements/sidebar.vue';
import Content from './elements/content.vue';
import { useAuth } from '../../service/useAuth';
import { ref,defineProps } from 'vue';

const { logout } = useAuth();
const isSidebarToggled = ref(false);
const navBarToggle = (value) => {
  isSidebarToggled.value = value
};
</script>

<template>
  <div class="page" id="dasboardPage">
      <div class="page-main">
        <div id="wrapper" :class="{'toggled': isSidebarToggled}">
          <SideBar></SideBar>
          <NavBar @logout="logout" @nav-bar-toggle="navBarToggle" ></NavBar>
          <Content></Content>
        </div>
      </div>
  </div>
</template>
<style>
@import '../../assets/dashboard.css';
</style>