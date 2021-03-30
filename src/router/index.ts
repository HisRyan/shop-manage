import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'signup'}
  },
  {
    path: '/signup',
    name : 'signup',
    component: () => import('../views/signup/index.vue')
  },
  {
    path: '/register',
    name : 'register',
    component: () => import('../views/signup/register.vue')
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
