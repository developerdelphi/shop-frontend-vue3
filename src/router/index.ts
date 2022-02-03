import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: import('../views/Home.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: import('../views/SignIn.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: import('../views/Dashboard.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: import('../views/Products.vue'),
  },

  {
    path: '/cart',
    name: 'cart',
    component: import('../views/Cart.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
