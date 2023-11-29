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
import AnimationLoader from "@/components/common/AnimationLoader.vue";
import { openLinkInNewTab } from "@/util/helper";

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
  animationLoader();
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

const animationLoader = () => {
  const timeline = anime.timeline({
    autoplay: true,
    direction: "alternate",
    loop: true,
  });

  timeline
    .add({
      targets: animatedSvg.value.querySelectorAll("path"),
      d: {
        value: [
          "M 7.7423617,6.5524041 C 0.14213171,13.241204 -0.28352929,25.218399 6.5488487,32.446038 13.237649,40.04627 24.578354,40.568996 32.442483,33.639553 39.813699,26.434583 40.216105,14.96193 33.635997,7.7459191 26.935569,0.39795815 15.101951,-0.40029585 7.7423617,6.5524041 Z",
          "M 1.4639006,1.6816009 C 1.4129866,11.374999 1.1386316,31.038516 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 39.621131,30.764045 38.910573,9.4542879 39.093715,1.2274189 30.247144,1.2462399 8.8125376,1.8724369 1.4639006,1.6816009 Z",
        ],
        duration: 1500,
        easing: "easeInOutQuad",
      },
      offset: 0,
    })
    .add({
      targets: animatedSvg.value.querySelector(".shape1"),
      fill: {
        value: ["#2095F2", "#4BAF4F"],
        duration: 1500,
        easing: "easeInOutQuad",
      },
      offset: 0,
    })
    .add({
      targets: "path",
      d: {
        value: [
          "M 1.4639006,1.6816009 C 1.4129866,11.374999 1.1386316,31.038516 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 39.621131,30.764045 38.910573,9.4542879 39.093715,1.2274189 30.247144,1.2462399 8.8125376,1.8724369 1.4639006,1.6816009 Z",
          "M 19.499615,1.5030295 C 15.341558,11.017856 5.4243459,31.217087 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 34.978274,30.942616 24.624859,11.418574 20.165144,1.5845618 18.73688,1.6665173 20.913606,1.4728946 19.499615,1.5030295 Z",
        ],
        duration: 1500,
        easing: "easeInOutQuad",
      },
      offset: 1500,
    })
    .add({
      targets: ".shape1",
      fill: {
        value: ["#4BAF4F", "#F44236"],
        duration: 1500,
        easing: "easeInOutQuad",
      },
      offset: 1500,
    })
    .add({
      targets: "path",
      d: {
        value: [
          "M 19.499615,1.5030295 C 15.341558,11.017856 5.4243459,31.217087 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 34.978274,30.942616 24.624859,11.418574 20.165144,1.5845618 18.73688,1.6665173 20.913606,1.4728946 19.499615,1.5030295 Z",
          "M 7.7423617,6.5524041 C 0.14213171,13.241204 -0.28352929,25.218399 6.5488487,32.446038 13.237649,40.04627 24.578354,40.568996 32.442483,33.639553 39.813699,26.434583 40.216105,14.96193 33.635997,7.7459191 26.935569,0.39795815 15.101951,-0.40029585 7.7423617,6.5524041 Z",
        ],
        duration: 1500,
        easing: "easeInOutQuad",
      },
      offset: 3000,
    })
    .add({
      targets: ".shape1",
      fill: {
        value: ["#F44236", "#2095F2"],
        duration: 1500,
        easing: "easeInOutQuad",
      },
      offset: 3000,
    });
};
</script>
<template>
  <div class="modal fade" id="basicModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" id="create-popup" role="document">
      <div class="modal-content1">
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
                  <select
                    class="form-select select-category"
                    id="businessCategory"
                    aria-label="Select an option"
                    v-model="values.businessCategory"
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

                  <label for="logo" class="form-label">Logo</label>
                  <input
                    type="file"
                    name="logo"
                    id="logo"
                    class="form-control input"
                    accept=".jpg, .jpeg, .png"
                    @change="onFileChange"
                  />
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
                  Next
                </button>
              </div>
              <div
                class="step step-4"
                :class="currentStep != 4 ? 'd-none' : ''"
              >
                <div class="mb-3 next-step">
                  <svg
                    class="shape shape1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 40 40"
                    ref="animatedSvg"
                  >
                    <path
                      style="opacity: 1; fill-opacity: 1; stroke: none"
                      d="M 7.7423617,6.5524041 C 0.14213171,13.241204 -0.28352929,25.218399 6.5488487,32.446038 13.237649,40.04627 24.578354,40.568996 32.442483,33.639553 39.813699,26.434583 40.216105,14.96193 33.635997,7.7459191 26.935569,0.39795815 15.101951,-0.40029585 7.7423617,6.5524041 Z"
                    />
                  </svg>
                  <svg
                    class="shape shape2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 40 40"
                  >
                    <path
                      style="opacity: 1; fill-opacity: 1; stroke: none"
                      d="M 7.7423617,6.5524041 C 0.14213171,13.241204 -0.28352929,25.218399 6.5488487,32.446038 13.237649,40.04627 24.578354,40.568996 32.442483,33.639553 39.813699,26.434583 40.216105,14.96193 33.635997,7.7459191 26.935569,0.39795815 15.101951,-0.40029585 7.7423617,6.5524041 Z"
                    />
                  </svg>
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
