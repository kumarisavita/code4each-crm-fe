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

const store = useStore();

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
  console.log(allDashboardData.value);
  // openModalWithCategories();
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
                    <i class="fa fa-cubes" aria-hidden="true"></i> Welcome To
                    Agency Dashboard
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

              website...
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
              class="card"
              aria-hidden="true"
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
              @click="openModalWithCategories"
            >
              <h3 class="create-text">Create your website</h3>
              <div class="card-design">
                <span class="create-icons">
                  <i class="fa fa-plus-square"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <SiteSettings />
  <!-- <div
    class="modal fade drawer right-align"
    id="exampleModalRight"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <img src="images/black-logo.png" />
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
              <div>
                <p class="fw-bold">Instance Access</p>
                <p class="text-wrapper">
                  Complete your purchase by providing your payment details
                </p>
              </div>
              <form class="text-start mb-2 mt-3">
                <label for="basic-url" class="form-label">Website URL</label>
                <div class="form-field mb-4">
                  <div class="input-group mb-3">
                    <input
                      type="url"
                      class="form-control"
                      placeholder="https://www.google.com/"
                      aria-label="https://www.google.com/"
                      aria-describedby="button-addon2"
                    />
                  </div>
                  <button
                    class="btn btn-outline-success btn-success linkBtn"
                    type="button"
                    id="button-addon2"
                  >
                    <i class="fa fa-share-square"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger btn-danger text-light linkBtn"
                    type="button"
                    id="button-addon3"
                  >
                    <i
                      class="fa fa-copy"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="copy"
                    ></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <section class="Settings-form">
            <div class="form-wrapper">
              <div class="row">
                <div class="col-sm-6 form-group">
                  <label for="" class="form-label">Website Category</label>
                  <select class="form-select" aria-label="Select an option">
                    <option value="">Open this select menu</option>
                    <option value="1">Education</option>
                    <option value="2">Health</option>
                    <option value="3">Digital Marketing</option>
                    <option value="4">Information</option>
                  </select>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="" class="form-label">Business Name</label>
                  <input
                    type="text"
                    placeholder="Business Name"
                    class="form-control input"
                  />
                  <div class="text-danger"></div>
                </div>
                <div class="col-sm-6 form-group">
                  <label for="" class="form-label">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    class="form-control input"
                  />
                  <div class="text-danger"></div>
                </div>

                <div class="col-sm-6 form-group">
                  <label for="" class="form-label">Website Logo</label>
                  <input type="file" name="logo" class="form-control input" />
                  <div class="text-danger"></div>
                </div>
                <div class="col-sm-12 form-group">
                  <label for="" class="form-label">Description</label>
                  <textarea
                    class="form-control input"
                    placeholder="Description..(optional)"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="modal-footer">
          <div class="col-sm-12 form-group">
            <button type="submit" class="btn btn-success mt-4">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <AgencyDetailModal
    :showModal="showModal"
    :categories="categories"
    @hide-modal="showModal = false"
    :dashboardData="dashboardData"
  />
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
