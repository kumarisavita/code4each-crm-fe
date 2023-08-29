import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/Dashboard.vue'
import MyHomeView from '../views/HomeView.vue'

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
      meta: { requiresAuth: true ,title: 'Dashbaord' } // Add this meta field
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title || 'Code4Each CRM'; 
  document.title = pageTitle;
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login');
  } else {
    document.title = to.meta.title || 'Code4Each CRM';
    next();
  }
});

function isLoggedIn() {
  // Replace with your actual authentication logic
  return localStorage.getItem('access_token') !== null && !undefined;
}

export default router;