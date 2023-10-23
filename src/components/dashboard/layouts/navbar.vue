<script setup>
import { defineEmits, ref, defineProps } from "vue";

const emits = defineEmits();
const isSidebarToggled = ref(false);

const toggleSidebar = () => {
  isSidebarToggled.value = !isSidebarToggled.value;
  emits("nav-bar-toggle", isSidebarToggled.value);
};
const logout = () => {
  emits("logout");
};

const props = defineProps({
  dashboardData: Object,
});
// consol(props.dashboardData);
</script>
<template>
  <div id="navbar-wrapper">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header main-header-left">
          <a
            href="javascript:void(0)"
            class="navbar-brand"
            id="sidebar-toggle"
            @click="toggleSidebar"
          >
            <i class="fa fa-align-left"></i>
          </a>
        </div>
        <div class="main-header-right">
          <button
            class="navbar-toggler navresponsive-toggler d-lg-none ms-auto collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon fa fa-ellipsis-v"></span>
          </button>
          <div
            class="navbar navbar-expand-lg navbar-collapse responsive-navbar p-0"
          >
            <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
              <ul class="nav nav-item header-icons navbar-nav-right ms-auto">
                <!-- Country-selector-->
                <!-- <li class="dropdown header-search">
                  <a
                    class="nav-link icon header-search"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    <i class="fa fa-search"></i>
                  </a>
                  <div class="dropdown-menu">
                    <div class="main-form-search p-2">
                      <input
                        class="form-control"
                        placeholder="Search"
                        type="search"
                      />
                      <button class="btn">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </li> -->
                <!-- CART -->
                <li class="dropdown profile-1">
                  <a
                    href="#"
                    data-bs-toggle="dropdown"
                    class="nav-link leading-none d-flex"
                  >
                    <span>
                      <img
                        src="/images/15.jpg"
                        alt="profile-user"
                        class="avatar profile-user brround cover-image"
                      />
                    </span>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
                  >
                    <div class="drop-heading">
                      <div class="text-center">
                        <h5 class="text-dark mb-0">
                          {{ dashboardData?.name }}
                        </h5>
                        <small class="text-muted">{{
                          dashboardData?.agency.name
                        }}</small>
                      </div>
                    </div>
                    <div class="dropdown-divider m-0"></div>
                    <!-- <a class="dropdown-item" href="profile.html">
                      <i class="dropdown-icon fa fa-user"></i> Profile
                    </a>
                    <a class="dropdown-item" href="settings.html">
                      <i class="dropdown-icon fa fa-cog"></i> Settings
                    </a>
                    <a class="dropdown-item" href="email.html">
                      <span class="float-end"></span>
                      <i class="dropdown-icon fa fa-inbox"></i> Inbox
                    </a>
                    <a class="dropdown-item" href="emailservices.html">
                      <i class="dropdown-icon fa fa-comment"></i> Message
                    </a>
                    <div class="dropdown-divider mt-0"></div> -->
                    <a class="dropdown-item" @click="logout">
                      <i class="dropdown-icon fa fa-sign-in"></i> Sign out
                    </a>
                  </div>
                </li>
                <!-- <li class="dropdown header-settings">
                  <a
                    href="javascript:void(0);"
                    class="nav-link icon"
                    data-bs-toggle="sidebar-right"
                    data-bs-target=".sidebar-right"
                  >
                    <i class="fa fa-align-right"></i>
                  </a>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
