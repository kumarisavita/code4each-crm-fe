<script setup>
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import { useAuth } from "@/service/useAuth";
import { useRouter } from "vue-router";
import { ref, defineProps, onMounted, provide, inject } from "vue";
import WordpressService from "@/service/WordpressService";
import Modal from "@/components/common/Modal.vue";

const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);

const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};

const loading = ref(true);
const error = ref(false);
const errors = ref([]);
const dashboardData = ref([]);
const loadingForColors = ref(true);
const defaultColors = ref();

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

const getDefaultColors = async () => {
  try {
    const response = await WordpressService.CustomizeColors.getDefaulColors();
    if (response.status === 200 && response.data) {
      console.log(response, "ddddd");
      defaultColors.value = response.data;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

onMounted(async () => {
  await fetchDashboardData();
  await getDefaultColors();
  loadingForColors.value = false;
});

const changeDefaultColors = async (colorSetId) => {
  loadingForColors.value = true;
  console.log(colorSetId, "iiiiiiiiii");
  try {
    loadingForColors.value = true;
    // const response = await WordpressService.Components.changeComponent({
    //   website_url: dashboardData?.value?.agency_website_info[0].website_domain,
    //   component_unique_id_old: oldComponent.value,
    //   component_unique_id_new: newComponent.value,
    // });

    // if (response.status === 200) {
    //   await getDefaultColors();
    // }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  loadingForColors.value = false;
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
        <div v-if="loadingForColors">
          <div class="spinner-container">
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <section v-else id="content-wrapper main-content side-content">
          <div class="default-color">
            <div
              v-for="(colorSet, setIndex) in defaultColors"
              :key="setIndex"
              class="color-set"
            >
              <div
                v-for="(color, colorIndex) in colorSet.colors"
                :key="colorIndex"
                class="color-dot"
                :style="{ backgroundColor: color }"
              ></div>
              <button
                class="btn btn-sm btn-primary changeColorBtn"
                @click="changeDefaultColors(colorSet.id)"
              >
                Choose
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-set {
  display: flex;
  margin: 20px;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #000;
}
.changeColorBtn {
  margin-left: 20px;
}

.default-color {
  margin: 30px;
}
</style>