import { createRouter, createWebHistory } from 'vue-router'
import useAuthState from '../store/auth/useAuthState'

const routes = [
  {
    path: '/',
    name: 'home',
    component: import('../views/Home.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: import('../views/SignIn.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'products',
    component: import('../views/Products.vue')
  },

  {
    path: '/cart',
    name: 'cart',
    component: import('../views/Cart.vue')
  },

  {
    path: '/product/:slug',
    name: 'product',
    component: import('../views/Product.vue'),
    props: true
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

const { isAuthenticated } = useAuthState()

router.beforeEach((to, from, next) => {
  // console.log('rota para login', to.name === 'signin' && isAuthenticated)
  if (to.name === 'signin' && isAuthenticated.value) return next()

  const requiresAuth = to.meta?.requiresAuth || false
  // console.log('ROTA AUTH', requiresAuth)
  // console.log('USUÁRIO AUTHENTICATED', isAuthenticated.value)
  if (!!requiresAuth && !isAuthenticated.value) next({ name: 'signin' })
  else next()
})

export default router
