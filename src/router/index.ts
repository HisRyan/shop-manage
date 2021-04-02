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
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children:[
      {
        path: '/home/edit',
        name: 'edit',
        component: () => import('../views/edit/index.vue')
      }
    ]
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
     next()
})

export default router
