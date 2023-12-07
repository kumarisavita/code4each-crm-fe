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
import config from "/config";
import { copyTextToClipboard, openLinkInNewTab } from "@/util/helper";
import AnimationLoader from "@/components/common/AnimationLoader.vue";

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
const isCopied = ref(false);
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
const isDisabled = ref(false);
const formData = ref({});
const allErrors = ref({});
const { Errors, resetForm, handleSubmit } = useForm();

watch(
  () => store.websiteId,
  async (newWebsiteId, oldWebsiteId) => {
    loadingForSettings.value = true;
    // await fetchDashboardData();
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
      categories.value = response.data.categories.map((category) => ({
        label: category.name,
        value: category.id,
      }));
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
  // await fetchDashboardData();
  allErrors.value = {};
  await getSiteDeatils();
  await openModalWithCategories();
  setFormValues();
  loadingForSettings.value = false;
});

const validationSchema = yup.object({
  address: yup.string().required("Address field is required"),
  category_id: yup.string().required("Category field is required"),
  website_id: yup.string().required(),
  business_name: yup.string().required("Business Name field is required"),
  state: yup.string().required("State field is required"),
  country: yup.string().required("Country field is required"),
  city: yup.string().required("City field is required"),
  zip: yup.string().required("Zip Code  field is required"),
  logo: yup.mixed().test("fileType", "Unsupported file format", (value) => {
    if (!value) {
      return true; // Allow empty values (no file selected)
    }

    const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
    return value && supportedFormats.includes(value.type);
  }),
});

const updateWebsiteSettings = handleSubmit(async () => {
  try {
    isDisabled.value = true;
    await validationSchema.validate(formData.value, { abortEarly: false });
    allErrors.value = {};
    const customHeaders = {
      "Content-Type": "multipart/form-data",
    };

    const response = await WordpressService.WebsiteSettings.updateSiteSettings(
      formData.value,
      customHeaders
    );
    if (response.status === 200 && response.data.success) {
      await fetchDashboardData();
      await getSiteDeatils();
      await openModalWithCategories();
      resetForm();
    }
  } catch (validationErrors) {
    const errors = validationErrors.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});

    allErrors.value = errors;
  }
  isDisabled.value = false;
});

const clearFormValues = (values) => {
  values.category_id = "";
  values.description = "";
  values.address = "";
};

const categoryOptions = computed(() =>
  categories?.value?.map((category) => ({
    label: category.name,
    value: category.id,
  }))
);

const setFormValues = () => {
  formData.value = {};
  formData.value.logo = "";
  const agencyWebsiteDetail = siteSettingsDeatil?.value?.agency_website_detail;
  formData.value.category_id = agencyWebsiteDetail?.website_category_id || "";
  formData.value.business_name = agencyWebsiteDetail?.business_name || "";
  formData.value.address = agencyWebsiteDetail?.address || "";
  formData.value.description =
    agencyWebsiteDetail?.description !== "undefined"
      ? agencyWebsiteDetail?.description
      : "";
  formData.value.country = agencyWebsiteDetail?.country || "";
  formData.value.city = agencyWebsiteDetail?.city || "";
  formData.value.zip = agencyWebsiteDetail?.zip || "";
  formData.value.state = agencyWebsiteDetail?.state || "";
  formData.value.website_id = agencyWebsiteDetail?.website_id;
};

const handleCopyClick = (text) => {
  copyTextToClipboard(text);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
};

watch(
  () => siteSettingsDeatil,
  (newsiteSettingsDeatil, OldsiteSettingsDeatil) => {
    // allDashboardData.value = props.dashboardData;
    setFormValues();
  },
  {
    deep: true,
  }
);

const onFileChange = (event) => {
  formData.value.logo = event.target.files[0];
};

const goToCutomize = () => {
  router.push("/customize");
};
</script>

<template>
  <div
    class="modal fade drawer right-align"
    id="exampleModalRight"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    v-if="siteSettingsDeatil?.agency_website_detail"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <div v-if="siteSettingsDeatil"> -->
          <img
            v-if="siteSettingsDeatil?.agency_website_detail?.logo"
            :src="
              config.CRM_API_URL + siteSettingsDeatil.agency_website_detail.logo
            "
          />
          <span v-else>{{
            siteSettingsDeatil?.agency_website_detail?.business_name
          }}</span>
          <!-- </div> -->
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="box-2">
            <div class="box-inner-2">
              <!-- <div class="logoimg">
                <div>
                  <p class="fw-bold">Instance Access</p>
                  <p class="text-wrapper">
                    Complete your purchase by providing your payment details
                  </p>
                </div>
                <div class="speedylogo">
                  <img
                    v-if="siteSettingsDeatil?.agency_website_detail?.logo"
                    :src="
                      config.CRM_API_URL +
                      siteSettingsDeatil.agency_website_detail.logo
                    "
                  />
                  <span v-else>{{
                    siteSettingsDeatil?.agency_website_detail?.business_name
                  }}</span>
                </div>
              </div> -->
              <form class="text-start mb-2 mt-3">
                <label for="basic-url" class="form-label">Website URL</label>
                <div class="form-field mb-4">
                  <div class="input-group mb-3">
                    <input
                      type="url"
                      class="form-control"
                      :placeholder="siteSettingsDeatil.website_domain"
                      :aria-label="siteSettingsDeatil.website_domain"
                      aria-describedby="button-addon2"
                      :disabled="true"
                    />
                  </div>
                  <button
                    class="btn btn-outline-success btn-success linkBtn"
                    type="button"
                    id="button-addon2"
                    @click="openLinkInNewTab(siteSettingsDeatil.website_domain)"
                  >
                    <i class="fa fa-share-square"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger btn-danger text-light linkBtn"
                    type="button"
                    id="button-addon3"
                    @click="handleCopyClick(siteSettingsDeatil.website_domain)"
                  >
                    <i
                      class="fa fa-copy"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="copy"
                    ></i>
                  </button>
                  <div v-if="isCopied" class="success-message">Copied!</div>
                </div>
              </form>
            </div>
          </div>
          <section class="Settings-form">
            <div class="form-wrapper">
              <div class="row">
                <div class="col-sm-6 form-group">
                  <label for="category_id" class="form-label"
                    >Website Category*</label
                  >
                  <select
                    class="form-select"
                    aria-label="Select an option"
                    v-model="formData.category_id"
                    id="category_id"
                  >
                    <option value="" selected>Open this select menu</option>
                    {{
                      categories
                    }}
                    <option
                      v-for="option in categories"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                  <div class="text-danger">{{ allErrors.category_id }}</div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="business_name" class="form-label"
                    >Business Name*</label
                  >
                  <input
                    type="text"
                    placeholder="Business Name"
                    class="form-control input"
                    v-model="formData.business_name"
                    id="business_name"
                  />
                  <div class="text-danger">{{ allErrors.business_name }}</div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="address" class="form-label">Address*</label>
                  <input
                    type="text"
                    placeholder="Address"
                    class="form-control input"
                    v-model="formData.address"
                    id="address"
                  />
                  <div class="text-danger">{{ allErrors.address }}</div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="city" class="form-label">City*</label>
                  <input
                    type="text"
                    placeholder="City"
                    class="form-control input"
                    v-model="formData.city"
                    id="city"
                  />
                  <div class="text-danger">{{ allErrors.city }}</div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="city" class="form-label">State*</label>
                  <input
                    type="text"
                    placeholder="State"
                    class="form-control input"
                    v-model="formData.state"
                    id="State"
                  />
                  <div class="text-danger">{{ allErrors.state }}</div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="zip" class="form-label">Zip Code*</label>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    class="form-control input"
                    v-model="formData.zip"
                    id="zip"
                  />
                  <div class="text-danger">{{ allErrors.zip }}</div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="country" class="form-label">Country*</label>
                  <select
                    class="form-select"
                    id="country"
                    aria-label="Select an option"
                    v-model="formData.country"
                  >
                    <option value="">Open this select menu</option>
                    <option value="india">India</option>
                    <option value="europe">Europe</option>
                    <option value="england">England</option>
                  </select>
                  <div class="text-danger">{{ allErrors.country }}</div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="logo" class="form-label">Website Logo</label>
                  <input
                    type="file"
                    name="logo"
                    class="form-control input"
                    accept=".jpg, .jpeg, .png"
                    @change="onFileChange"
                    id="logo"
                  />
                  <div class="text-danger">{{ allErrors.logo }}</div>
                </div>
                <div class="col-sm-12 form-group">
                  <label for="" class="form-label">Description</label>
                  <textarea
                    class="form-control input"
                    placeholder="Description..(optional)"
                    rows="3"
                    v-model="formData.description"
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- <div class="modal-footer">
          <div class="col-sm-6 form-group">
            <button
              type="submit"
              class="btn btn-success mt-4"
              @click="updateWebsiteSettings"
              :disabled="isDisabled"
            >
              Submit
              <AnimationLoader v-if="isDisabled" />
            </button>
          </div>
          <div class="col-sm-6 form-group">
            <button
              type="button"
              class="btn btn-success-1 mt-4"
              @click="goToCutomize"
              data-dismiss="modal"
            >
              Customize
            </button>
          </div>
        </div> -->

        <div class="modal-footer">
          <div class="button-wrap">
            <button
              class="custom-button"
              type="button"
              @click="goToCutomize"
              data-dismiss="modal"
            >
              <span class="button-text">Customize</span>
            </button>

            <button
              class="custom-button-fill"
              @click="updateWebsiteSettings"
              :disabled="isDisabled"
            >
              <span class="button-fill-text"
                >Submit
                <AnimationLoader v-if="isDisabled" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="page" id="dasboardPage">
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
                  config.CRM_API_URL +
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
  </div> -->
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
.success-message {
  background-color: #090a09; /* Green background color */
  color: white; /* White text color */
  padding: 5px; /* Smaller padding */
  border-radius: 5px; /* Rounded corners */
  margin-top: 10px; /* Margin at the top */
  font-size: 12px; /* Smaller font size */
  height: 28px;
}
</style>
