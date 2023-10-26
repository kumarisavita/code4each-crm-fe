<template>
  <aside id="sidebar-wrapper">
    <div class="sidebar-brand">
      <!-- <img src="/images/black-logo.png" /> -->
      {{ dashboardData?.agency_website_info?.[0]?.business_name || "" }}
    </div>

    <ul class="sidebar-nav">
      <li class="select-li">
        <SelectBox
          v-if="
            dashboardData?.agency_website_info?.length >= 1 && selectedValue
          "
          name="website_id"
          inputClass="form-select"
          ariaLabel="Select an option"
          :options="websiteOptions"
          defaultText="Open this select menu"
          :defaultValue="selectedValue"
          label=""
          @onChangeCallback="handleSelectChange"
          :defaultTextHide="true"
        >
        </SelectBox>
      </li>
      <li :class="{ active: currentRoute === '/dashboard' }">
        <router-link :to="{ name: 'dashboard' }">
          <a> <i class="fa fa-wordpress"></i>Dashboard </a>
        </router-link>
      </li>
      <li
        v-if="dashboardData?.agency_website_info?.length >= 1"
        :class="{ active: currentRoute === '/customize' }"
      >
        <router-link :to="{ name: 'customize' }">
          <a> <i class="fa fa-product-hunt"></i>Customize </a>
        </router-link>
        <ul v-if="dashboardData?.agency_website_info?.length >= 1">
          <li :class="{ active: currentRoute === '/customize/components' }">
            <router-link :to="{ name: 'customize_components' }"
              >Components</router-link
            >
          </li>
          <li :class="{ active: currentRoute === '/customize/colors' }">
            <router-link :to="{ name: 'customize_colors' }">Colors</router-link>
          </li>
          <li :class="{ active: currentRoute === '/customize/fonts' }">
            <router-link :to="{ name: 'customize_fonts' }">Fonts</router-link>
          </li>
        </ul>
      </li>
      <li
        v-if="dashboardData?.agency_website_info?.length >= 1"
        :class="{ active: currentRoute === '/settings' }"
      >
        <router-link :to="{ name: 'site_settings' }">
          <a> <i class="fa fa-cog"></i>Settings </a>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, defineProps, onMounted, computed } from "vue";
import SelectBox from "@/components/common/SelectBox.vue";
import { useStore } from "@/stores/store";

const props = defineProps({
  dashboardData: Object,
});
const route = useRoute();
const router = useRouter();
const currentRoute = ref(route.path);
const dashboardData = ref([]);
const isActive = (routePath) => route.path === routePath;
const store = useStore();
const selectedValue = ref();

const handleSelectChange = (selectedValue) => {
  store.updateWebsiteId();
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

onMounted(() => {
  dashboardData.value = props.dashboardData;
  store.fetchInitialWebsiteId();
  selectedValue.value = store.websiteId;
});

const websiteOptions = computed(() =>
  props.dashboardData?.agency_website_info.map((website_info) => ({
    label: website_info.business_name,
    value: website_info.website_id,
  }))
);

watch(
  () => store.websiteId,
  (newFullPath, oldcurrentRouteFullPath) => {
    selectedValue.value = store.websiteId;
  }
);
</script>

<style scoped>
.select-li {
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
