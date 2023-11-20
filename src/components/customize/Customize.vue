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
import { capitalizeAndReplaceChar } from "@/util/helper";
import { VueDraggableNext } from "vue-draggable-next";

const router = useRouter();
const { logout } = useAuth();
const isSidebarToggled = ref(false);
const activeComponentsDetail = ref([]);
const allComponentsDetailAccToType = ref();
const selectedImage = ref();
const store = useStore();
const oldComponentType = ref();
const navBarToggle = (value) => {
  isSidebarToggled.value = value;
};
const storeComponentsPosition = ref([]);
const buttonStates = ref();
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
const saveComponentPositionBtn = ref(false);
const enabled = ref(true);
const disableDragDrop = ref(true);
const itemDraggingStates = ref({});
const showEditMupltipleImagesModal = ref(false);
const uploadedFiles = ref([]);
const disableImageSubmitButton = ref();
const fileInput = ref(null);
const componentImagesAcctoType = ref();
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

      activeComponentsDetail.value.forEach((image) => {
        activeComponentsDetail.dragging = false;
      });
      updateItemPositions();
      buttonStates.value = new Array(activeComponentsDetail.value.length).fill(
        false
      );
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
      oldComponentType.value = compType;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  showModal.value = true;
};

onMounted(async () => {
  fileInput.value = ref.fileInput;
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
  showEditMupltipleImagesModal.value = false;
  uploadedFiles.value = [];
  fileInput.value = null;
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
    const formFields = Object.keys(data).reduce((acc, key) => {
      let meta1 = null;
      let meta2 = null;

      let modifiedString = key.replace(/-meta1|-meta2/g, "");

      // Check if field_name already exists
      const existingFieldIndex = acc.findIndex(
        (field) => field.field_name === modifiedString
      );

      if (existingFieldIndex !== -1) {
        // If the field_name already exists, update meta1 and meta2 values
        const existingField = acc[existingFieldIndex];
        meta1 =
          existingField.meta1 ||
          (key.includes("meta1") ? data[key] : undefined);
        meta2 =
          existingField.meta2 ||
          (key.includes("meta2") ? data[key] : undefined);

        // Update the existing entry
        acc[existingFieldIndex] = {
          ...existingField,
          meta1: meta1,
          meta2: meta2,
        };
      } else {
        acc.push({
          field_name: modifiedString,
          field_value: data[key],
          type: componentsFieldsUnderEdit.value.type,
          meta1: meta1,
          meta2: meta2,
          field_type: null,
        });
      }
      return acc;
    }, []);
    const response =
      await WordpressService.ComponentsFormField.updateComponentsFormField({
        website_url: siteSettingsDeatil.value?.website_domain,
        component_unique_id: componentsFieldsUnderEdit.value.id,
        form_fields: formFields,
      });
    if (response.status === 200 && response.data.success) {
      loadingForComonents.value = false;
      Swal.fire({
        title: "<strong>Saved!</strong>",
        icon: "success",
        html:
          "Changes Saved Successfully, " +
          '<a href="' +
          siteSettingsDeatil.value?.website_domain +
          '" target= "_blank">preview your site</a> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      });
    }
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

const onEndComponentPosition = (evt) => {
  saveComponentPositionBtn.value = true;
  console.log("end");
  for (const itemId in itemDraggingStates.value) {
    itemDraggingStates.value[itemId] = false;
  }
};

const onStartComponentPosition = (evt) => {
  saveComponentPositionBtn.value = false;
};

const saveComponentPosition = async () => {
  try {
    loadingForComonents.value = true;
    saveComponentPositionBtn.value = false;
    const response = await WordpressService.Components.changeComponentPosition({
      updated_positions: storeComponentsPosition.value,
      website_url: siteSettingsDeatil.value?.website_domain,
    });
    if (response.status === 200 && response.data.success) {
      Swal.fire({
        title: "<strong>Saved!</strong>",
        icon: "success",
        html:
          "Changes Saved Successfully, " +
          '<a href="' +
          siteSettingsDeatil.value?.website_domain +
          '" target= "_blank">preview your site</a> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      });
      getActiveComponentsData();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  loadingForComonents.value = false;
};

const updateItemPositions = () => {
  storeComponentsPosition.value = activeComponentsDetail.value.map(
    (compo, index) => ({
      component_unique_id: compo.id,
      position: index + 1,
    })
  );
};

watch(() => activeComponentsDetail.value, updateItemPositions, { deep: true });

const handleFileUpload = () => {
  const files = fileInput.value.files;
  uploadedFiles.value = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    uploadedFiles.value.push(file);
  }
};
const getImageUrl = (file) => {
  return window.URL.createObjectURL(file);
};

const handleEditImagesModal = async (componentUniqueId, type) => {
  loading.value = true;
  componentsFieldsUnderEdit.value.id = componentUniqueId;
  componentsFieldsUnderEdit.value.type = type;
  showEditMupltipleImagesModal.value = true;
  getComponentsImages();
  loading.value = false;
};

const getComponentsImages = async () => {
  try {
    const response =
      await WordpressService.ComponentsFormField.getComponentsImages({
        type: componentsFieldsUnderEdit.value.type,
        website_url: siteSettingsDeatil.value?.website_domain,
      });

    if (response.status === 200 && response.data.success) {
      componentImagesAcctoType.value = response.data.data;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const submitForm = async () => {
  try {
    loading.value = true;
    disableImageSubmitButton.value = true;
    const formData = new FormData();
    const files = uploadedFiles.value;
    for (let i = 0; i < files.length; i++) {
      formData.append("uploaded_images[]", files[i]);
    }
    formData.append("type", componentsFieldsUnderEdit.value.type);
    formData.append("website_url", siteSettingsDeatil.value?.website_domain);

    const customHeaders = {
      "Content-Type": "multipart/form-data",
    };

    const response =
      await WordpressService.ComponentsFormField.updateComponentImages(
        formData,
        customHeaders
      );
    if (response.status === 200 && response.data.success) {
      disableImageSubmitButton.value = false;
      getComponentsImages();
    }
  } catch (error) {
    console.error(error);
  }
  uploadedFiles.value = [];
  loading.value = false;
  fileInput.value = null;
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

const deleteComponentImage = async (imageUrl) => {
  try {
    loading.value = true;
    let deleteImages = [];
    deleteImages.push(imageUrl);
    const response =
      await WordpressService.ComponentsFormField.deleteComponentImage({
        delete_images: deleteImages,
        website_url: siteSettingsDeatil.value?.website_domain,
      });

    if (response.status === 200 && response.data.success) {
      getComponentsImages();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  loading.value = false;
};
const deleteComponentImageConfirmShow = (imageUrl) => {
  Swal.fire({
    title: "Do you want to delete image?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      deleteComponentImage(imageUrl);
    }
  });
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
                Change {{ capitalizeAndReplaceChar(oldComponentType, "_") }}
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
                {{
                  capitalizeAndReplaceChar(componentsFieldsUnderEdit.type, "_")
                }}
                Settings
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
          <Modal
            :show-modal="showEditMupltipleImagesModal"
            @update:show-modal="showEditMupltipleImagesModal = $event"
            modal-id="customizeModal"
            :show-footer="false"
          >
            <template #header>
              <h4 class="modal-title text-center" id="customizeModalLabel">
                {{
                  capitalizeAndReplaceChar(componentsFieldsUnderEdit.type, "_")
                }}
                Settings
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
                v-for="(allComponentImage, index) in componentImagesAcctoType"
                :key="index"
                class="testimonial"
              >
                <div>
                  <img
                    :src="allComponentImage.value"
                    alt="Dynamic"
                    class="testimonialImg"
                  />
                  <button
                    @click="
                      deleteComponentImageConfirmShow(allComponentImage.value)
                    "
                    style="
                      position: absolute;
                      background: white;
                      border: none;
                      cursor: pointer;
                    "
                    class="ml-2"
                  >
                    &#10006;
                  </button>
                </div>
              </div>
            </div>
            <form @submit.prevent="submitForm" enctype="multipart/form-data">
              <input
                type="file"
                ref="fileInput"
                multiple
                @change="handleFileUpload"
              />

              <div v-if="uploadedFiles?.length > 0">
                <h4 class="mt-2">Selected Files:</h4>
                <ul>
                  <li v-for="(file, index) in uploadedFiles" :key="index">
                    <img
                      :src="getImageUrl(file)"
                      alt="Uploaded Image"
                      width="200"
                      class="mb-3"
                    />
                    <button
                      @click="removeFile(index)"
                      style="
                        position: absolute;
                        background: white;
                        border: none;
                        cursor: pointer;
                      "
                      class="ml-2"
                    >
                      &#10006;
                    </button>
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                :disabled="
                  uploadedFiles.length <= 0 || disableImageSubmitButton
                "
                class="btn btn-success mt-4 me-2"
              >
                Submit
              </button>
            </form>
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
                <VueDraggableNext
                  class="dragArea list-group w-full"
                  :list="activeComponentsDetail"
                  @end="onEndComponentPosition"
                  @start="onStartComponentPosition"
                  dragClass="dragItem"
                  ghostClass="dropHere"
                >
                  <div
                    v-for="(compValue, index) in activeComponentsDetail"
                    :key="index"
                    class="image-container"
                  >
                    <img
                      :src="
                        'https://devcrmapi.code4each.com' + compValue.preview
                      "
                      alt="Dynamic"
                      width="800"
                      :class="{
                        dragItem: compValue.dragging,
                      }"
                    />
                    <div class="button-container">
                      <button
                        class="btn btn-primary custom-button image-button me-2"
                        @click="openModal(compValue.type, compValue.id)"
                      >
                        Change
                      </button>
                      <button
                        class="btn btn-primary custom-button image-button me-2"
                        @click="
                          handleEditComponentBtnClick(
                            compValue.id,
                            compValue.type
                          )
                        "
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-primary custom-button image-button"
                        @click="
                          handleEditImagesModal(compValue.id, compValue.type)
                        "
                      >
                        Edit Images
                      </button>
                    </div>
                  </div>
                </VueDraggableNext>
              </div>

              <button
                type="button"
                v-if="saveComponentPositionBtn"
                @click="saveComponentPosition"
                class="btn btn-success mt-4 me-2"
              >
                Submit
              </button>
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

.image-button-drag {
  top: 50%;
  right: 15%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
}

.dragging {
  opacity: 0.7; /* Reduce opacity while dragging */
  border: 2px solid #3498db; /* Add a border */
  border-radius: 4px; /* Round the corners */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Add a shadow */
}

.dragItem {
  border: 1px dashed red;
  background: red;
  opacity: 0.5;
}
.dropHere {
  border: 5px dashed red;
}

.dragItem {
  background-color: #f1f1f1; /* Background color */
  border: 2px solid #666; /* Border style */
  color: #333; /* Text color */
  cursor: grab; /* Cursor style */
  opacity: 0.7; /* Opacity while dragging */
  transition: all 0.3s; /* Smooth transition */

  /* Additional styles as needed */
}
.dropHere {
  background-color: #e1e1e1; /* Background color */
  border: 2px dashed #666; /* Border style */
  color: #555; /* Text color */
  cursor: pointer; /* Cursor style */

  /* Additional styles as needed */
}

.dragArea {
  cursor: move;
}
</style>
