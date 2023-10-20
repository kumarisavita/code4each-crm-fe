import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/Dashboard.vue'
import MyHomeView from '../views/HomeView.vue'
import CustomizeView from '../views/CustomizeView.vue'
import CustomizeColors from '../views/CustomizeWebsiteColors.vue'
import CustomizeWebsiteFonts from '../views/CustomizeWebsiteFonts.vue'
import RessetPassword from "@/components/forget_password/RessetPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyHomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, title: 'Dashbaord' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/customize',
      name: 'customize',
      component: CustomizeView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: RessetPassword,
    },
    {
      path: '/customize/colors',
      name: 'customize_colors',
      component: CustomizeColors
    },
    {
      path: '/customize/components',
      name: 'customize_components',
      component: CustomizeView
    },
    {
      path: '/customize/fonts',
      name: 'customize_fonts',
      component: CustomizeWebsiteFonts
    }
  ]
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title || 'Code4Each CRM';
  document.title = pageTitle;
  if (to.path === "/login" && isLoggedIn()) {
    next("/dashboard");
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

function isLoggedIn() {
  return localStorage.getItem('access_token') !== null && !undefined;
}

export default router;