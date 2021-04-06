import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<any> = [
  {
    path: '/',
    redirect: { name: 'signup' }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/signup/register.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      name: '主页',
      breadcrumb: true
    },
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/home/edit',
        name: 'edit',
        meta: {
          name: '富文本编辑器',
          breadcrumb: true
        },
        component: () => import('../views/edit/index.vue')
      },
      {
        path: '/home/form',
        name: 'form',
        meta: {
          name: '自定义表单',
          breadcrumb: true
        },
        component: () => import('../views/form/index.vue')
      },
      {
        path: '/home/upload',
        name: 'upload',
        meta: {
          name: '上传文件',
          breadcrumb: true
        },
        component: () => import('../views/upload/index.vue')
      },
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
