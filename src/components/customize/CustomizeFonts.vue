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
const userData = ref([]);
const showModal = ref(false);
const loadingForComonents = ref(true);
const oldComponent = ref();
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
    defaultColors.value = [
      ["#3366FF", "#FF33AA", "#33FF00", "#FF9900", "#33AAFF"],
      ["#FF3300", "#33FF99", "#FF00CC", "#33CCFF", "#FF0066"],
      ["#FF5733", "#33FF6A", "#336AFF", "#FF33B8", "#33FFEF"],
      ["#FFAA33", "#33FF10", "#3351FF", "#FFA733", "#33FF77"],
    ];
    // const response = await WordpressService.Components.getActiveComponents({
    //   website_url: dashboardData?.value?.agency_website_info[0].website_domain,
    // });
    // if (response.status === 200 && response.data.success) {
    //   activeComponentsDetail.value = response.data.components_detail;
    // }
    // console.log(activeComponentsDetail.value, "ddddd");
  } catch (error) {}
};

const loadingOnOff = async (value) => {
  loading.value = value;
};

onMounted(async () => {
  await fetchDashboardData();
  await getDefaultColors();
  loadingForComonents.value = false;
  EventBus.on("fetchDashboardData", fetchDashboardData);
  EventBus.on("loadingOnOff", loadingOnOff);
});

provide("dashBoardMethods", {
  fetchDashboardData,
});

const closeModal = () => {
  allComponentsDetailAccToType.value = [];
  showModal.value = false;
  selectedImage.value = null;
};

const showSelectedComponent = (component_unique_id, imgPath) => {
  selectedImage.value = component_unique_id;
  console.log(component_unique_id, "iiii");
  newComponent.value = component_unique_id;

  Swal.fire({
    width: 900,
    imageUrl: imgPath,
    imageWidth: 800,
    imageHeight: 400,
    imageAlt: "Custom image",
    confirmButtonText: "Change Component",
    showCloseButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      changeComponent();
    }
  });
};

const changeComponent = async () => {
  console.log("ssssssssssssssss");
  loadingForComonents.value = true;
  showModal.value = false;
  await getActiveComponentsData();
  loadingForComonents.value = false;
};
const defaultFonts = ref([
  { id: "Alumni Sans Collegiate One", name: "Alumni Sans Collegiate One" },
  { id: "Lato", name: "Lato" },
  { id: "Playfair Display", name: "Playfair Display" },
  { id: "Merriweather", name: "Merriweather" },
]);

const defaultFontsSelectBox = computed(() =>
  defaultFonts.value.map((category) => ({
    label: category.name,
    value: category.id,
  }))
);
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
        <div>
          <SelectBox
            name="font_id"
            inputClass="form-select"
            ariaLabel="Select an option"
            :options="defaultFontsSelectBox"
            defaultText="Open this select menu"
            defaultValue=""
            label="Fonts"
          >
          </SelectBox>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Alumni Sans Collegiate One");
@import url("https://fonts.googleapis.com/css?family=Alumni Sans Collegiate One");

/* Montserrat Font */
.heading1 {
  font-family: "Alumni Sans Collegiate One";
}
.heading2 {
  font-family: "Open Sans";
}
.heading3 {
  font-family: "Lato";
}
.heading4 {
  font-family: "Montserrat";
}
.heading5 {
  font-family: "Raleway";
}
.heading6 {
  font-family: "Playfair Display";
}
.heading7 {
  font-family: "Nunito";
}
</style>