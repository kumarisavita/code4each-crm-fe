<script setup>
import { ref, defineProps } from "vue";
import Alert from "../elements/Alert.vue";
import AgencyButton from "../elements/AgencyButton.vue";
import AgencyWebsite from "../elements/AgencyWebsite.vue";
import WebsiteUrl from "../elements/WebsiteUrl.vue";
import WordpressService from "@/service/WordpressService";

const props = defineProps({
  dashboardData: Object,
  error: String,
  loading: Boolean,
  resendLink: Function,
});
</script>
<template>
  <Alert
    v-if="dashboardData.notification"
    :notification="dashboardData.notification"
    :resendLink="resendLink"
  />
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
      <div class="main-container container-fluid">
        <div class="page-header">
          <ol class="breadcrumb">
            <!-- breadcrumb -->
            <li class="breadcrumb-item">
              <a href="#">
                <h3 class="mb-0 breadcrump-tittle">
                  Welcome To Agency Dashboard
                </h3>
              </a>
            </li>
          </ol>
          <!-- End breadcrumb -->
          <div class="ms-auto">
            <div></div>
          </div>
        </div>
        <div class="row">
          <WebsiteUrl
            v-if="dashboardData.agency_website_info"
            :websiteData="dashboardData.agency_website_info"
          />
          <AgencyWebsite v-else :dashboardData="dashboardData" />
        </div>
      </div>
    </div>
  </section>
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
