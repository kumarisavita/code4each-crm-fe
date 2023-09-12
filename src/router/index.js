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
      meta: { requiresAuth: true ,title: 'Dashbaord' } 
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

// router.beforeEach((to, from, next) => {
//   const pageTitle = to.meta.title || 'Code4Each CRM'; 
//   document.title = pageTitle;
//   if (to.meta.requiresAuth && !isLoggedIn()) {
//     next('/login');
//   } else {
//     document.title = to.meta.title || 'Code4Each CRM';
//     next();
//   }
// });

export default router;