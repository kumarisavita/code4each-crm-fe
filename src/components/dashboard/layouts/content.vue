<script setup>
import { ref, defineProps, watch, onMounted } from "vue";
import Alert from "../elements/Alert.vue";
import AgencyButton from "../elements/AgencyButton.vue";
import AgencyWebsite from "../elements/AgencyWebsite.vue";
import WebsiteUrl from "../elements/WebsiteUrl.vue";
import WordpressService from "@/service/WordpressService";
import AgencyDetailModal from "../elements/AgencyDetailModal.vue";
import SiteSettings from "@/views/SiteSettings.vue";
import { useStore } from "@/stores/store";
import { useForm } from "vee-validate";
import * as yup from "yup";
const allErrors = ref({});

const props = defineProps({
  dashboardData: Object,
  error: String,
  loading: Boolean,
  resendLink: Function,
});

const categories = ref([]);
const allDashboardData = ref();
const showModal = ref(false);
const deatilModalShow = ref(false);
const { errors, resetForm, handleSubmit } = useForm();
const store = useStore();
const values = ref({
  type: "", // Default value
});
const errorMessage = ref("");
allErrors;
watch(
  () => props.dashboardData,
  (newDashboardData, OldDashboardData) => {
    allDashboardData.value = props.dashboardData;
  },
  {
    deep: true,
  }
);

onMounted(() => {
  allDashboardData.value = props.dashboardData;
  allErrors.value = {};
});

const openModalWithCategories = async () => {
  try {
    const response = await WordpressService.getCategoryOption();
    if (response.status === 200 && response.data.success) {
      categories.value = response.data.categories;
      // showModal.value = true;
    }
    console.log(showModal.value);
  } catch (error) {
    console.error(error);
  }
};

const updateSite = (website_id) => {
  store.updateWebsiteId(website_id);
  deatilModalShow.value = true;
};

const formattedDate = (stringDate) => {
  const date = new Date(stringDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const validationSchema = yup.object({
  type: yup.string().required(),
  title: yup.string().required(),
  message: yup.string().required(),
});

const submitFeedback = handleSubmit(async () => {
  try {
    let formValues = values.value;
    await validationSchema.validate(values.value, { abortEarly: false });
    const formData = new FormData();
    formData.append("type", formValues.type);
    formData.append("title", formValues.title);
    formData.append("agency_id", allDashboardData.value?.user?.agency_id);
    formData.append("email", allDashboardData.value?.user?.email);
    formData.append(
      "phone",
      allDashboardData.value.user.phone ? allDashboardData.value.user.phone : ""
    );
    formData.append("message", formValues.message);
    const response = await WordpressService.FeedBack.submitFeedback(formData);
    if (response.status === 200 && response.data.success) {
      emptyForm();
    }
  } catch (validationErrors) {
    const errors = validationErrors.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});

    allErrors.value = errors;
    // errorMessage.value = error.response?.data?.message;
    // console.error(allErrors.value);
  }
  emptyForm();
});

const emptyForm = () => {
  values.value.type = "";
  values.value.message = "";
  values.value.title = "";
};
</script>
<template>
  <div>
    <div v-if="loading">
      <div class="spinner-container">
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p v-if="error">Error fetching dashboard data.</p>
    </div>
  </div>
  <section id="content-wrapper main-content side-content">
    <div class="side-app">
      <div class="" style="margin-left: 18%" v-if="dashboardData.notification">
        <Alert
          :notification="dashboardData.notification"
          :resendLink="resendLink"
        />
      </div>
      <div v-else class="main-container container">
        <div id="wrapper">
          <div class="page-header">
            <ol class="breadcrumb">
              <!-- breadcrumb -->
              <li class="breadcrumb-item">
                <a href="#">
                  <h3>
                    <i class="fa fa-cubes" aria-hidden="true"></i> Welcome TO
                    Dashboard
                  </h3>
                </a>
              </li>
            </ol>
            <!-- End breadcrumb -->
            <div class="ms-auto">
              <div>
                <button
                  class="btnclickable-element Button"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  @click="openModalWithCategories"
                >
                  Create a Website <i class="fa fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="section-wrapper">
            <h3
              class="text-muted mb-4"
              v-if="dashboardData?.agency_website_info?.length >= 1"
            >
              {{ dashboardData?.agency_website_info?.length }}
              {{
                dashboardData?.agency_website_info?.length > 1
                  ? "websites..."
                  : "website..."
              }}
            </h3>
          </div>
          <div class="card-wrappers">
            <!-- <div> -->
            <div
              class="card"
              aria-hidden="true"
              data-toggle="modal"
              data-target="#exampleModalRight"
              v-for="(dash, index) in dashboardData.agency_website_info"
              :key="index"
              @click="updateSite(dash.website_id)"
            >
              <div
                class="card-primary"
                aria-hidden="true"
                data-toggle="modal"
                data-target="#exampleModalRight"
              >
                <div class="valign">
                  <h5>
                    <span class="cards-icons"
                      >{{ dash.business_name.charAt(0).toUpperCase() }}
                    </span>
                    <br />
                  </h5>
                </div>
              </div>
              <div class="card-content">
                <div class="form-content">
                  <form class="text-start mb-2 mt-3">
                    <div class="form-field mb-4">
                      <h4 class="form-label text-dark">
                        {{ dash.business_name }}
                      </h4>
                      <div class="input-group mb-3">
                        <a href="#" class="website-links">{{
                          dash.website_domain
                        }}</a>
                      </div>
                      <p class="text-muted">
                        Created at {{ formattedDate(dash.created_at) }}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="ag-courses_item"
              aria-hidden="true"
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
              @click="openModalWithCategories"
            >
              <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>

                <div class="ag-courses-item_title">Create a your site</div>

                <div class="ag-courses-item_date-box">
                  <span class="ag-courses-item_date">
                    <i class="fa fa-plus-circle"></i>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <SiteSettings />
  <AgencyDetailModal
    :showModal="showModal"
    :categories="categories"
    @hide-modal="showModal = false"
    :dashboardData="dashboardData"
  />
  <div
    class="modal fade"
    id="modalContactForm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body mx-3">
          <div class="card-layout layout-medium">
            <div class="content">
              <!-- <form id="multi-step-form" @submit.prevent="submitFeedback"> -->
              <div class="close-button"></div>

              <h1 class="title">Give feedback/Inquiry</h1>
              <!-- <p>What do you think of the editing tool?</p>

              <div class="emojis">
                <span class="eachEmoji">😥</span>
                <span class="eachEmoji">😔</span>
                <span class="eachEmoji">😐</span>
                <span class="eachEmoji">😀</span>
                <span class="eachEmoji">😇</span>
              </div> -->

              <label data-error="wrong" data-success="right" for="form34"
                >Title</label
              >
              <input
                type="text"
                id="form34"
                class="form-control validate"
                placeholder="title"
                v-model="values.title"
              />
              <div class="text-danger">{{ allErrors.title }}</div>
              <label data-error="wrong" data-success="right" for="form34"
                >Type</label
              >
              <select
                class="form-select1"
                aria-label="Select an option"
                v-model="values.type"
              >
                <option value="">Open this select menu</option>
                <option value="review">Review</option>
                <option value="complaint">Complaint</option>
                <option value="feedback">Feedback</option>
                <option value="suggestion">Suggestion</option>
                <option value="inquiry">Inquiry</option>
              </select>
              <div class="text-danger">{{ allErrors.type }}</div>
              <label data-error="wrong" data-success="right" for="form34"
                >Message</label
              >
              <textarea
                name="users-feedback"
                id="users-feedback"
                placeholder="Write your message here..."
                v-model="values.message"
              ></textarea>
              <div class="text-danger">{{ allErrors.message }}</div>
              <div class="user-actions">
                <button class="feedback-btn-primary" @click="submitFeedback">
                  Send
                </button>
                <button
                  class="feedback-btn-outline"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  Cancel
                </button>
              </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
