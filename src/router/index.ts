import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import SingIn from '../views/SignIn.vue';

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
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
