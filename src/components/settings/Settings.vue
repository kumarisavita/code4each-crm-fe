<script setup>
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import { useAuth } from "@/service/useAuth";
import { useRouter } from "vue-router";
import {
  ref,
  defineProps,
  onMounted,
  provide,
  inject,
  computed,
  watch,
} from "vue";
import WordpressService from "@/service/WordpressService";
import Modal from "@/components/common/Modal.vue";
import Swal from "sweetalert2";
import VeeInput from "@/components/common/VeeInput.vue";
import { useForm } from "vee-validate";
import { EventBus } from "@/EventBus";
import SelectBox from "@/components/common/SelectBox.vue";
import * as yup from "yup";
import { useStore } from "@/stores/store";

const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);
const siteSettingsDeatil = ref([]);
const allComponentsDetailAccToType = ref();
const selectedImage = ref();
const categories = ref();
const store = useStore();
const errorMessage = ref("");
const message = ref("");

const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};

const loading = ref(true);
const error = ref(false);
const errors = ref([]);
const dashboardData = ref([]);
const userData = ref([]);
const showModal = ref(false);
const loadingForSettings = ref(true);

watch(
  () => store.websiteId,
  async (newWebsiteId, oldWebsiteId) => {
    loadingForSettings.value = true;
    await fetchDashboardData();
    await getSiteDeatils();
    await openModalWithCategories();
    loadingForSettings.value = false;
  }
);

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

const getSiteDeatils = async () => {
  try {
    const response = await WordpressService.WebsiteSettings.getSiteDetail({
      website_id: store.websiteId,
    });
    if (response.status === 200 && response.data.success) {
      siteSettingsDeatil.value = response.data.settings_detail;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const openModalWithCategories = async () => {
  try {
    const response = await WordpressService.getCategoryOption();
    if (response.status === 200 && response.data.success) {
      categories.value = response.data.categories;
    }
  } catch (error) {
    console.error(error);
  }
};

const openModal = async (compType, oldComponentUniqueeId) => {
  try {
    const response = await WordpressService.Components.getAllComponents({
      type: compType,
    });
    if (response.status === 200 && response.data.success) {
      allComponentsDetailAccToType.value = response.data.component;
      oldComponent.value = oldComponentUniqueeId;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  showModal.value = true;
};

onMounted(async () => {
  await fetchDashboardData();
  await getSiteDeatils();
  await openModalWithCategories();
  loadingForSettings.value = false;
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    address: yup.string().required("Address field is required"),
    category_id: yup.string().required("Category field is required"),
    website_id: yup.string().required(),
    business_name: yup.string().required("Business Name field is required"),
  }),
});

const updateWebsiteSettings = handleSubmit(async (values) => {
  try {
    loadingForSettings.value = true;
    const formData = new FormData();
    let logoValue = values.logo;
    console.log(values.logo);
    if (values.logo === undefined) {
      logoValue = "";
    }
    formData.append("logo", logoValue);
    formData.append("business_name", values.business_name);
    formData.append("website_id", values.website_id);
    formData.append("category_id", values.category_id);
    formData.append("address", values.address);
    formData.append("description", values.description);
    const customHeaders = {
      "Content-Type": "multipart/form-data",
    };

    const response = await WordpressService.WebsiteSettings.updateSiteSettings(
      formData,
      customHeaders
    );
    if (response.status === 200 && response.data.success) {
      await fetchDashboardData();
      await getSiteDeatils();
      await openModalWithCategories();
      loadingForSettings.value = false;
      message.value = response?.data?.message;
      clearFormValues(values);
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message;
    console.error(error);
  }
  loading.value = false;
});

const clearFormValues = (values) => {
  values.category_id = "";
  values.description = "";
  values.address = "";
};

const categoryOptions = computed(() =>
  categories.value.map((category) => ({
    label: category.name,
    value: category.id,
  }))
);
</script>

<template>
  <div class="page" id="dasboardPage">
    <div class="page-main">
      <div id="wrapper" :class="{ toggled: isSidebarToggled }">
        <SideBar :dashboardData="dashboardData"></SideBar>
        <NavBar
          @logout="logout"
          @nav-bar-toggle="navBarToggle"
          :dashboardData="dashboardData?.user"
        ></NavBar>
        <div v-if="loadingForSettings">
          <div class="spinner-container">
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <section v-else id="content-wrapper main-content side-content">
          <form
            @submit.prevent="updateWebsiteSettings"
            enctype="multipart/form-data"
            slot="body"
            class="settings-form"
          >
            <div
              v-if="errorMessage"
              class="error-message text-danger text-center"
            >
              {{ errorMessage }}
            </div>
            <div v-if="message" class="error-message text-success text-center">
              {{ message }}
            </div>
            <div class="form-group">
              <SelectBox
                name="category_id"
                inputClass="form-select"
                ariaLabel="Select an option"
                :options="categoryOptions"
                defaultText="Open this select menu"
                :defaultValue="
                  siteSettingsDeatil?.agency_website_detail?.website_category_id
                "
                label="Website Category"
              >
              </SelectBox>
              <VeeInput
                name="business_name"
                placeholder="Business Name"
                class="form-control input"
                :hiddenValue="
                  siteSettingsDeatil?.agency_website_detail?.business_name
                "
                label="Business Name"
              />
              <VeeInput
                name="address"
                placeholder="Address"
                class="form-control input"
                label="Address"
                :hiddenValue="
                  siteSettingsDeatil?.agency_website_detail?.address
                "
              />
              <img
                v-if="siteSettingsDeatil?.agency_website_detail?.logo"
                :src="
                  'https://devcrmapi.code4each.com' +
                  siteSettingsDeatil?.agency_website_detail?.logo
                "
                alt="Dynamic"
                width="400"
                class="mb-3 mt-3 d-flex"
              />
              <VeeInput
                name="logo"
                placeholder="Website Logo"
                class="form-control input"
                label="Website Logo"
                type="file"
              />
              <VeeInput
                name="description"
                :textarea="true"
                placeholder="Description..(optional)"
                class="form-control input"
                label="Description"
                :hiddenValue="
                  siteSettingsDeatil?.agency_website_detail?.description
                "
              />
              <VeeInput
                name="website_id"
                type="hidden"
                :hiddenValue="store.websiteId"
              />
              <button type="submit" class="btn btn-success mt-4">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
<style>
.image-container {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.button-container {
  position: absolute;
  bottom: 49px;
  right: 488px;
}

.custom-button {
  background-color: rgba(163, 48, 19, 0.2);
  color: #000;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;

  /* Additional styles */
  border-radius: 5px;
  font-weight: bold;
  opacity: 0.5;
}

.custom-button:hover {
  background-color: rgba(21, 62, 105, 0.2);
  opacity: 1;
}

.testimonial-container {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 15px;
}

.testimonial {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  /* width: 300px; */
  margin: 10px 0px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.testimonialImg {
  width: 150px;
  height: 120px;
}

p {
  font-size: 16px;
  line-height: 1.5;
}
.custom-modal-lg {
  max-width: 50%;
}

.flagWiseImg {
  width: 300px;
  border: 2px solid green;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}

.settings-form {
  margin: 40px;
}
</style>
