<script setup>
import { ref, computed, defineEmits, onMounted, inject, watch } from "vue";
import SelectBox from "@/components/common/SelectBox.vue";
import Modal from "@/components/common/Modal.vue";
import VeeInput from "@/components/common/VeeInput.vue";
import WordpressService from "@/service/WordpressService";
import { useForm } from "vee-validate";
import { EventBus } from "@/EventBus";
import * as yup from "yup";
import "@/assets/js/dashboard.js";
import { openLinkInNewTab } from "@/util/helper";
import Loader from "@/components/common/Loader.vue";

const dashBoardMethods = inject("dashBoardMethods");
const loading = ref("");
const errorMessage = ref("");
const message = ref("");
const countdown = ref(5);
const files = ref([]);
const currentStep = ref(1);
const allDashboardData = ref();
const animatedSvg = ref(null);
const values = ref({});
const domainUrl = ref(null);
const { errors, resetForm, handleSubmit } = useForm();
const showOthersCategoryName = ref(false);

const props = defineProps({
  showModal: true,
  dashboardData: Object,
  categories: Array,
});

const emits = defineEmits();
const closeModal = () => {
  emits("hide-modal");
};

const categoryOptions = computed(() =>
  props.categories.map((category) => ({
    label: category.name,
    value: category.id,
  }))
);

const submitAgencyDetailC = handleSubmit(async () => {
  try {
    currentStep.value = 4;
    let formValues = values.value;
    const formData = new FormData();
    formData.append("logo", formValues.logo);
    formData.append("business_name", formValues.businessName);
    formData.append("agency_id", allDashboardData.value?.user?.agency_id);
    formData.append("category_id", formValues.businessCategory);
    formData.append("address", formValues.address);
    formData.append("city", formValues.city);
    formData.append("state", formValues.state);
    formData.append("country", formValues.country);
    formData.append("zip", formValues.zip);
    formData.append("description", formValues.description);
    formData.append("phone", formValues.phone);
    if (showOthersCategoryName) {
      formData.append("others_category_name", formValues.othersCategoryName);
    }
    const customHeaders = {
      "Content-Type": "multipart/form-data",
    };
    const response = await WordpressService.agencyDetails(
      formData,
      customHeaders
    );
    if (response.status === 200 && response.data.success) {
      message.value = response?.data?.message;
      domainUrl.value = response?.data?.website_domain;
      EventBus.emit("fetchDashboardData");
      currentStep.value = 5;
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message;
    console.error(error);
  }
  resetForm();
});

const clearFormValues = (values) => {
  values.category_id = "";
  values.description = "";
  values.address = "";
};

const setFormValues = () => {
  values.value.businessName = allDashboardData.value?.user?.agency?.name;
  values.value.businessCategory = "";
  values.value.country = "india";
};
onMounted(() => {
  allDashboardData.value = props.dashboardData;
  setFormValues();
});

watch(
  () => props.dashboardData,
  (newDashboardData, OldDashboardData) => {
    allDashboardData.value = props.dashboardData;
    setFormValues();
  },
  {
    deep: true,
  }
);

const prevStep = () => {
  currentStep.value--;
};
const nextStep = () => {
  currentStep.value++;
};

const onFileChange = (event) => {
  values.value.logo = event.target.files[0];
};

const oncategoryChange = (event) => {
  const selectedOption = event.target.selectedOptions[0];
  if (selectedOption && selectedOption.label === "Others") {
    showOthersCategoryName.value = true;
  } else {
    showOthersCategoryName.value = false;
    values.value.othersCategoryName = "";
  }
};
</script>
<template>
  <div class="modal fade" id="basicModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" id="create-popup" role="document">
      <div class="modal-content1">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div id="container" class="container">
            <form
              id="multi-step-form"
              @submit.prevent="submitAgencyDetailC"
              enctype="multipart/form-data"
            >
              <div class="step step-1" v-if="currentStep === 1">
                <!-- Step 1 form fields here -->
                <h3>Create a new website</h3>
                <div class="mb-3">
                  <label for="businessName" class="form-label"
                    >Business Name*</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="businessName"
                    name="businessName"
                    v-model="values.businessName"
                  />
                  <span>{{
                    errors.businessName ? errors.businessName[0] : ""
                  }}</span>
                  <label for="businessCategory" class="form-label"
                    >Business Category*</label
                  >
                  <div class="three-body2">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                  </div>
                  <select
                    class="form-select select-category"
                    id="businessCategory"
                    aria-label="Select an option"
                    v-model="values.businessCategory"
                    @change="oncategoryChange"
                  >
                    <option value="" selected>Open this select menu</option>
                    {{
                      categoryOptions
                    }}
                    <option
                      v-for="option in categoryOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                  <div v-if="showOthersCategoryName">
                    <label for="othersCategoryName" class="form-label"
                      >About Category</label
                    >
                    <textarea
                      class="form-control input"
                      placeholder="Wright About Category You Want.."
                      rows="3"
                      v-model="values.othersCategoryName"
                    ></textarea>
                  </div>
                  <!-- <label for="logo" class="form-label">Logo</label>
                  <input
                    type="file"
                    name="logo"
                    id="logo"
                    class="form-control input"
                    accept=".jpg, .jpeg, .png"
                    @change="onFileChange"
                  /> -->
                  <label for="phone" class="form-label">Phone*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    name="phone"
                    v-model="values.phone"
                  />
                  <span>{{ errors.phone ? errors.phone[0] : "" }}</span>
                  <label for="formFileLg" class="form-label"
                    >Website Logo</label
                  >
                  <input
                    type="file"
                    name="logo"
                    id="custom-file-upload"
                    class="form-control input form-control-lg"
                    accept=".jpg, .jpeg, .png"
                    @change="onFileChange"
                  />
                  <i class="fa fa-upload"></i>
                </div>

                <button
                  type="button"
                  class="btn btn-primary next-step"
                  :disabled="!values.businessName || !values.businessCategory"
                  @click="nextStep"
                >
                  Get started
                </button>
              </div>

              <div class="step step-2" v-if="currentStep === 2">
                <div class="mb-3">
                  <h3>Is one of these your listing?</h3>
                  <label for="address" class="form-label">Address*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    name="address"
                    v-model="values.address"
                  />
                  <label for="city" class="form-label">City*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="city"
                    name="city"
                    v-model="values.city"
                  />
                  <label for="state" class="form-label">State*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="state"
                    name="state"
                    v-model="values.state"
                  />
                  <label for="zip" class="form-label">Zip Code*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    name="zip"
                    v-model="values.zip"
                  />
                  <label for="country" class="form-label">Country*</label>
                  <select
                    class="form-select"
                    id="country"
                    aria-label="Select an option"
                    v-model="values.country"
                  >
                    <option value="">Open this select menu</option>
                    <option value="india">India</option>
                    <option value="europe">Europe</option>
                    <option value="england">England</option>
                  </select>
                </div>

                <button
                  type="button"
                  class="btn btn-primary prev-step"
                  @click="prevStep"
                >
                  Previous
                </button>
                <button
                  type="button"
                  class="btn btn-primary next-step"
                  :disabled="
                    !values.address ||
                    !values.city ||
                    !values.state ||
                    !values.zip ||
                    !values.country
                  "
                  @click="nextStep"
                >
                  Next
                </button>
              </div>
              <div class="step step-3" v-if="currentStep === 3">
                <!-- Step 2 form fields here -->

                <div class="mb-3">
                  <label for="description" class="form-label"
                    >Description (optional)</label
                  >
                  <textarea
                    class="form-control input"
                    placeholder="Description.."
                    rows="3"
                    v-model="values.description"
                  ></textarea>
                </div>

                <button
                  type="button"
                  class="btn btn-primary prev-step"
                  @click="prevStep"
                >
                  Previous
                </button>
                <button type="submit" class="btn btn-primary next-step">
                  Create Site
                </button>
              </div>
              <div
                class="step step-4"
                :class="currentStep != 4 ? 'd-none' : ''"
              >
                <div class="mb-3 next-step">
                  <!-- <Loader /> -->
                  <div class="three-body2">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                  </div>
                </div>
              </div>
              <div class="step step-5" v-if="currentStep === 5">
                <!-- Step 2 form fields here -->
                <div class="mb-3">
                  <div class="Successfully">
                    <h1>Thank you !</h1>

                    <div class="success alert"></div>
                    <p>
                      Successfully created your Site
                      <a href="url" class="wesbite-url">{{ domainUrl }}</a>
                    </p>

                    <button
                      class="go-home"
                      type="sumit"
                      @click="openLinkInNewTab(domainUrl)"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.select-category {
  height: 50px;
  padding: 10px 20px;
  font-size: 14px;
  margin-bottom: 15px;
  border: 1px solid lightgray;
}
</style>
