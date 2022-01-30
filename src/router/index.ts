import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import SingIn from '../views/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SingIn,
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
