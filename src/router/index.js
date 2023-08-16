import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/home/login.vue'
import DashboardView from '../views/Dashboard.vue'
import MyHomeView from '../views/HomeView.vue'

// router.beforeEach((to, from, next) => {
//   const token = getToken(); // Get the token from your storage (localStorage, cookies, etc.)
//   alert(token);
//   if (to.meta.requiresAuth && !token) {
//     // User is not authenticated, redirect to login
//     next('/login');
//   } else {
//     next(); // Proceed to the next route
//   }
// });

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
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});



export default router
