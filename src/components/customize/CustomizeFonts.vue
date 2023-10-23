<script setup>
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import { useAuth } from "@/service/useAuth";
import { useRouter } from "vue-router";
import { ref, defineProps, onMounted, provide, inject, computed } from "vue";
import WordpressService from "@/service/WordpressService";
import { EventBus } from "@/EventBus";
import Modal from "@/components/common/Modal.vue";
import Swal from "sweetalert2";
import SelectBox from "@/components/common/SelectBox.vue";

const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);
const activeComponentsDetail = ref([]);
const allComponentsDetailAccToType = ref();
const selectedImage = ref();

const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};

const loading = ref(true);
const error = ref(false);
const errors = ref([]);
const dashboardData = ref([]);
const loadingForFonts = ref(true);

const fetchDashboardData = async () => {
  try {
    const response = await WordpressService.fetchDashboardData();
    if (response.status === 200 && response.data.success) {
      loading.value = false;
      dashboardData.value = response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Please log in.", error);
      error.value = true;
      loading.value = false;
      localStorage.removeItem("access_token");
      router.push("/login");
    } else {
      console.error("An error occurred:", error.message);
    }
  }
};

const getDefaultFonts = async () => {
  try {
    const response = await WordpressService.CustomizeFonts.getDefaulFonts({
      website_url: dashboardData?.value?.agency_website_info[0].website_domain,
    });
    if (response.status === 200 && response.data.success) {
      defaultUrls.value = response.data.fonts;
    }
  } catch (error) {}
};

const loadingOnOff = async (value) => {
  loading.value = value;
};

onMounted(async () => {
  await fetchDashboardData();
  await getDefaultFonts();
  loadingForFonts.value = false;
  EventBus.on("fetchDashboardData", fetchDashboardData);
  EventBus.on("loadingOnOff", loadingOnOff);
});

const defaultUrls = ref();

const changeDefaultFonts = async (fontSetId) => {
  loadingForFonts.value = true;
  try {
    loadingForFonts.value = true;
    const response = await WordpressService.CustomizeFonts.changeDefaulFonts({
      website_url: dashboardData?.value?.agency_website_info[0].website_domain,
      font_id: fontSetId,
    });

    if (response.status === 200) {
      await getDefaultFonts();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  loadingForFonts.value = false;
};
</script>

<template>
  <div class="page" id="dasboardPage">
    <div class="page-main">
      <div id="wrapper" :class="{ toggled: isSidebarToggled }">
        <SideBar :dashboardData="dashboardData?.user"></SideBar>
        <NavBar
          @logout="logout"
          @nav-bar-toggle="navBarToggle"
          :dashboardData="dashboardData?.user"
        ></NavBar>
        <div v-if="loadingForFonts">
          <div class="spinner-container">
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="side-app">
          <div class="main-container container-fluid">
            <div class="row">
              <div
                v-for="(val, index) in defaultUrls"
                :key="index"
                class="image-container"
              >
                <img
                  :src="'https://devcrmapi.code4each.com/' + val.preview"
                  alt="Dynamic"
                  width="300"
                />
                <button
                  class="btn btn-sm btn-primary changeColorBtn"
                  @click="changeDefaultFonts(val.id)"
                  v-if="val.active === false"
                >
                  Choose
                </button>
                <span v-else class="active-span">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.changeColorBtn {
  margin-left: 20px;
}

.active-span {
  background-color: #27a125; /* Blue background color */
  color: #fff; /* White text color */
  padding: 4px 4px; /* Padding for better spacing */
  border-radius: 5px; /* Rounded corners */
  font-weight: bold; /* Bold text */
  text-transform: uppercase; /* Uppercase text */
  text-align: center; /* Center the text */
  cursor: pointer; /* Change the cursor to a pointer when hovering */
  transition: background-color 0.3s; /* Add a smooth transition */
  margin-left: 20px;
}

.active-span:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>