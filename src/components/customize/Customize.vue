<script setup>
import NavBar from "@/components/dashboard/layouts/navbar.vue";
import SideBar from "@/components/dashboard/layouts/sidebar.vue";
import { useAuth } from "@/service/useAuth";
import { useRouter } from "vue-router";
import { ref, defineProps, onMounted, provide, inject, watch } from "vue";
import WordpressService from "@/service/WordpressService";
import Modal from "@/components/common/Modal.vue";
import Swal from "sweetalert2";
import EditSiteSettingsFormBuilder from "@/components/common/EditSiteSettingsFormBuilder.vue";
import { useStore } from "@/stores/store";

const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);
const activeComponentsDetail = ref([]);
const allComponentsDetailAccToType = ref();
const selectedImage = ref();
const store = useStore();

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
const newComponent = ref();
const showEditComponentFieldModal = ref(false);
const siteSettingsFormFields = ref([]);
const siteSettingsDeatil = ref();
const componentsFieldsUnderEdit = ref({
  id: null,
  type: null,
});

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

const getActiveComponentsData = async () => {
  try {
    const response = await WordpressService.Components.getActiveComponents({
      website_url: dashboardData?.value?.agency_website_info[0].website_domain,
    });

    if (response.status === 200 && response.data.success) {
      activeComponentsDetail.value = response.data.components_detail;
      console.log(activeComponentsDetail.value, "ccccccccc");
    }
  } catch (error) {
    console.error("An error occurred:", error);
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
  await getActiveComponentsData();
  await getSiteDeatils();
  loadingForComonents.value = false;
});

watch(
  () => store.websiteId,
  async (newWebsiteId, oldWebsiteId) => {
    await fetchDashboardData();
    await getActiveComponentsData();
    await getSiteDeatils();
  }
);

provide("dashBoardMethods", {
  fetchDashboardData,
});

const closeModal = () => {
  allComponentsDetailAccToType.value = [];
  showModal.value = false;
  showEditComponentFieldModal.value = false;
  selectedImage.value = null;
  siteSettingsFormFields.value = null;
};

const showSelectedComponent = (component_unique_id, imgPath) => {
  if (component_unique_id === oldComponent.value) {
    return;
  }
  selectedImage.value = component_unique_id;
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
  try {
    loadingForComonents.value = true;

    const response = await WordpressService.Components.changeComponent({
      website_url: dashboardData?.value?.agency_website_info[0].website_domain,
      component_unique_id_old: oldComponent.value,
      component_unique_id_new: newComponent.value,
    });

    if (response.status === 200) {
      await getActiveComponentsData();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  loadingForComonents.value = false;
  showModal.value = false;
};

const handleEditComponentBtnClick = async (componentUniqueId, type) => {
  componentsFieldsUnderEdit.value.id = componentUniqueId;
  componentsFieldsUnderEdit.value.type = type;
  try {
    const response =
      await WordpressService.ComponentsFormField.getComponentsFormField({
        component_unique_id: componentUniqueId,
        website_url: siteSettingsDeatil.value?.website_domain,
      });
    if (response.status === 200 && response.data.success) {
      siteSettingsFormFields.value = response.data.data;
      showEditComponentFieldModal.value = true;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const submitCustomFields = async (data) => {
  try {
    const formFields = Object.keys(data).map((key) => ({
      field_name: key,
      field_value: data[key],
      type: componentsFieldsUnderEdit.value.type,
    }));

    const response =
      await WordpressService.ComponentsFormField.updateComponentsFormField({
        website_url: siteSettingsDeatil.value?.website_domain,
        component_unique_id: componentsFieldsUnderEdit.value.id,
        form_fields: formFields,
      });
  } catch (error) {
    console.error("An error occurred:", error);
  }
  showEditComponentFieldModal.value = false;
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
        <div v-if="loadingForComonents">
          <div class="spinner-container">
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <section v-else id="content-wrapper main-content side-content">
          <Modal
            :show-modal="showModal"
            @update:show-modal="showModal = $event"
            modal-id="customizeModal"
            :show-footer="false"
          >
            <template #header>
              <h4 class="modal-title text-center" id="customizeModalLabel">
                All Components
              </h4>
              <button
                type="button"
                class="close"
                @click="closeModal"
                data-dismiss="modal"
              >
                <span aria-hidden="true">×</span>
              </button>
            </template>
            <div class="testimonial-container">
              <div
                v-for="(
                  allComponentValue, index
                ) in allComponentsDetailAccToType"
                :key="index"
                class="testimonial"
                :class="{
                  flagWiseImg:
                    selectedImage === allComponentValue.component_unique_id,
                }"
                @click="
                  showSelectedComponent(
                    allComponentValue.component_unique_id,
                    'https://devcrmapi.code4each.com/' +
                      allComponentValue.preview
                  )
                "
              >
                <div
                  class=""
                  :class="{
                    imageContainer:
                      allComponentValue.component_unique_id === oldComponent,
                  }"
                >
                  <img
                    :src="
                      'https://devcrmapi.code4each.com/' +
                      allComponentValue.preview
                    "
                    alt="Dynamic"
                    class="testimonialImg"
                    :class="{
                      'disabled-image':
                        allComponentValue.component_unique_id === oldComponent,
                    }"
                  />
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            :show-modal="showEditComponentFieldModal"
            @update:show-modal="showEditComponentFieldModal = $event"
            modal-id="customizeModal"
            :show-footer="false"
          >
            <template #header>
              <h4 class="modal-title text-center" id="customizeModalLabel">
                Edit Component Settings
              </h4>
              <button
                type="button"
                class="close"
                @click="closeModal"
                data-dismiss="modal"
              >
                <span aria-hidden="true">×</span>
              </button>
            </template>
            <EditSiteSettingsFormBuilder
              :siteSettingsFormFields="siteSettingsFormFields"
              @submit-custom-fields="submitCustomFields"
            />
            <div v-if="loading">
              <div class="spinner-container">
                <div class="spinner-border text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </Modal>
          <div class="side-app">
            <div class="main-container container-fluid">
              <div class="row">
                <div
                  v-for="(compValue, index) in activeComponentsDetail"
                  :key="index"
                  class="image-container"
                >
                  <img
                    :src="'https://devcrmapi.code4each.com' + compValue.preview"
                    alt="Dynamic"
                    width="800"
                  />
                  <div class="button-container">
                    <button
                      class="btn btn-primary custom-button image-button me-2"
                      @click="openModal(compValue.type, compValue.id)"
                    >
                      Change
                    </button>
                    <button
                      class="btn btn-primary custom-button image-button"
                      @click="
                        handleEditComponentBtnClick(
                          compValue.id,
                          compValue.type
                        )
                      "
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
.imageContainer {
  display: inline-block;
  position: relative;
}

.imageContainer::before {
  content: "\2714"; /* Unicode checkmark character */
  position: absolute;
  left: 111%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: green;
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

.disabled-image {
  opacity: 0.5; /* Reduce opacity to make it appear disabled */
  pointer-events: none; /* Disable pointer events to prevent interaction */
}
</style>
