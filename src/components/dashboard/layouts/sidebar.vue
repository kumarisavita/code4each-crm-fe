<template>
  <aside id="sidebar-wrapper">
    <div class="sidebar-brand">
      Company Name
      <!-- <img src="/images/black-logo.png" /> -->
    </div>
    <ul class="sidebar-nav">
      <li :class="{ active: currentRoute === '/dashboard' }">
        <router-link :to="{ name: 'dashboard' }">
          <a> <i class="fa fa-wordpress"></i>Dashboard </a>
        </router-link>
      </li>
      <li :class="{ active: currentRoute === '/customize' }">
        <router-link :to="{ name: 'customize' }">
          <a> <i class="fa fa-product-hunt"></i>Customize </a>
        </router-link>
        <ul>
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
    </ul>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();
const router = useRouter();
const currentRoute = ref(route.path);
const isActive = (routePath) => route.path === routePath;
watch(
  () => route.path,
  (newFullPath, oldcurrentRouteFullPath) => {
    currentRoute.value = route.path;
    console.log(currentRoute, "rrrrrrrrrrrr");
  }
);
</script>
