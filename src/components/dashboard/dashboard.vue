<script setup>
import NavBar from './layouts/navbar.vue';
import SideBar from './layouts/sidebar.vue';
import Content from './layouts/content.vue';
import { useAuth } from '../../service/useAuth';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { ref,defineProps,onMounted } from 'vue';
import WordpressService from '@/service/WordpressService';


const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);
const navBarToggle = (value) => {
  isSidebarToggled.value = value
};


const loading = ref(true);
const error = ref(false);
const errors = ref([]);
const dashboardData = ref([]);
const userData = ref([]);


const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      loading.value = false;
      dashboardData.value = response.data;    
    }

  } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Authentication failed. Please log in.',error);
        error.value = true;
        loading.value = false;
        localStorage.removeItem('access_token');
        router.push('/login');
    } else {
      console.error('An error occurred:', error.message);
    }
  }
};

const resendLink = async () => {
  try {
    const response = await WordpressService.resendLink();
    Swal.fire(response.data.message);
    // alert(response.data.message);

  } catch (error) {
    console.log(error);
    // error.value = "Error Occur while resend link";
    console.error('Error Occur while resend link', error);
  }
};


onMounted(() => {
  fetchDashboardData();
});

</script>

<template>
  <div class="page" id="dasboardPage">
      <div class="page-main">
        <div id="wrapper" :class="{'toggled': isSidebarToggled}">
          <SideBar></SideBar>
          <NavBar @logout="logout" @nav-bar-toggle="navBarToggle"  :dashboardData="dashboardData?.user"></NavBar>
          <Content :dashboardData="dashboardData" :loading="loading"  :resendLink="resendLink"></Content>
        </div>
      </div>
  </div>
</template>
<style>
@import '../../assets/dashboard.css';
</style>