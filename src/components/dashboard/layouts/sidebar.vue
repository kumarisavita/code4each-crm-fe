<template>
  <div class="d-flex align-items-stretch">
    <div
      class="sidebar py-3"
      :class="{ 'shrink show': props.toggled }"
      id="sidebar"
    >
      <div
        class="show-currentwesbite"
        data-toggle="modal"
        data-target="#myModal"
        v-if="currentRoute != '/dashboard'"
      >
        <div class="card">
          <div class="card-show">
            <div
              class="website-show"
              data-toggle="modal"
              data-target="#myModal"
            >
              <h3 class="boxed">
                {{
                  siteSettingsDeatil?.agency_website_detail?.business_name
                    .charAt(0)
                    .toUpperCase()
                }}
              </h3>
              <a
                href="#"
                class="website-links"
                data-toggle="modal"
                data-target="#myModal"
              >
                <h5 class="text-center">
                  {{ siteSettingsDeatil?.website_domain }}
                </h5>
              </a>
            </div>
          </div>
        </div>
      </div>
      <h6 class="sidebar-heading">Main</h6>
      <ul class="list-unstyled">
        <li class="sidebar-list-item">
          <router-link :to="{ name: 'dashboard' }">
            <a
              class="sidebar-link text-muted"
              :class="{ active: currentRoute === '/dashboard' }"
            >
              <i class="fa fa-home me-3"></i>
              <span class="sidebar-link-title"> Dashboard</span>
            </a>
          </router-link>
        </li>
        <li
          class="sidebar-list-item"
          v-if="dashboardData?.agency_website_info?.length >= 1"
        >
          <a
            class="sidebar-link text-muted"
            :class="{ active: currentRoute.includes('/customize') }"
            href="#"
            data-bs-target="#cmsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <i class="fa fa-book me-3"></i>
            <span class="sidebar-link-title">Customize </span>
          </a>
          <ul
            class="sidebar-menu list-unstyled collapse"
            v-if="dashboardData?.agency_website_info?.length >= 1"
            id="cmsDropdown"
          >
            <li
              class="sidebar-list-item"
              :class="{ active: currentRoute === '/customize/components' }"
            >
              <router-link :to="{ name: 'customize_components' }">
                <a class="sidebar-link text-muted">Components</a>
              </router-link>
            </li>
            <li class="sidebar-list-item">
              <router-link :to="{ name: 'customize_colors' }">
                <a class="sidebar-link text-muted">Colors</a>
              </router-link>
            </li>
            <li class="sidebar-list-item">
              <router-link :to="{ name: 'customize_fonts' }">
                <a class="sidebar-link text-muted">Fonts</a>
              </router-link>
            </li>
          </ul>
        </li>
        <!-- <li class="sidebar-list-item">
          <a
            class="sidebar-link text-muted"
            href="#"
            data-bs-target="#widgetsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <i class="fa fa-line-chart me-3"></i>
            <span class="sidebar-link-title"> Widgets </span>
          </a>
          <ul class="sidebar-menu list-unstyled collapse" id="widgetsDropdown">
            <li class="sidebar-list-item">
              <a class="sidebar-link text-muted" href="#">Stats</a>
            </li>
            <li class="sidebar-list-item">
              <a class="sidebar-link text-muted" href="#">Data</a>
            </li>
          </ul>
        </li> -->
      </ul>
      <!-- <h6 class="sidebar-heading">Docs</h6> -->
      <!-- <ul class="list-unstyled">
        <li
          class="sidebar-list-item"
          v-if="dashboardData?.agency_website_info?.length >= 1"
        >
          <router-link :to="{ name: 'site_settings' }">
            <a
              class="sidebar-link text-muted"
              :class="{ active: currentRoute === '/settings' }"
              href="#"
            >
              <i class="fa fa-cog me-3"></i>
              <span class="sidebar-link-title">Settings</span>
            </a>
          </router-link>
        </li>
      </ul> -->
      <div class="Regenerate" v-if="currentRoute != '/dashboard'">
        <form class="text-start mb-2 mt-3">
          <div class="form-field mb-4">
            <button
              class="btn btn-outline-danger btn-danger text-light"
              type="button"
              id="button-addon3"
              data-toggle="modal"
              data-target="#myform"
            >
              <i class="fa fa-retweet" aria-hidden="true"></i> Regenerate
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ChangeWebsiteModal
    :allSitesData="dashboardData?.agency_website_info"
    :activeSite="siteSettingsDeatil?.agency_website_detail?.website_id"
  />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, defineProps, onMounted, computed } from "vue";
import SelectBox from "@/components/common/SelectBox.vue";
import ChangeWebsiteModal from "@/components/dashboard/elements/ChangeWebsiteModal.vue";
import { useStore } from "@/stores/store";
import { boolean } from "yup";
import WordpressService from "@/service/WordpressService";

const props = defineProps({
  dashboardData: Object,
  toggled: Boolean,
});
const route = useRoute();
const router = useRouter();
const currentRoute = ref(route.path);
const dashboardData = ref([]);
const isActive = (routePath) => route.path === routePath;
const store = useStore();
const selectedValue = ref();
const siteSettingsDeatil = ref([]);

const handleSelectChange = (selectedValue) => {
  store.updateWebsiteId(selectedValue);
};

watch(
  () => route.path,
  (newFullPath, oldcurrentRouteFullPath) => {
    currentRoute.value = route.path;
  }
);

watch(
  () => props.dashboardData,
  (newFullPath, oldcurrentRouteFullPath) => {
    dashboardData.value = props.dashboardData;
  }
);

onMounted(async () => {
  dashboardData.value = props.dashboardData;
  store.fetchInitialWebsiteId();
  selectedValue.value = store.websiteId;
  await getSiteDeatils();
});

const websiteOptions = computed(() =>
  props.dashboardData?.agency_website_info.map((website_info) => ({
    label: website_info.business_name,
    value: website_info.website_id,
  }))
);

watch(
  () => store.websiteId,
  async (newFullPath, oldcurrentRouteFullPath) => {
    selectedValue.value = store.websiteId;
    await getSiteDeatils();
  }
);

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

<style scoped>
.select-li {
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
