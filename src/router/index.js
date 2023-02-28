import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error/401.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Root',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/comp',
    component: Layout,
    name: 'Comp',
    meta: { title: '组件', icon: 'icon-code' },
    children: [
      {
        path: '/element',
        name: 'ElementComp',
        component: () => import('@/views/element/index.vue'),
        meta: {
          title: 'element组件',
          icon: 'icon-code',
        },
      },
      {
        path: '/chart',
        name: 'Chart',
        component: () => import('@/views/echarts/index.vue'),
        meta: { title: '图表', icon: 'icon-chart-line' },
        children: [
          {
            path: '/line',
            name: 'Line',
            component: () => import('@/views/echarts/line.vue'),
            meta: {
              title: '折线图',
            },
          },
          {
            path: '/bar',
            name: 'Bar',
            component: () => import('@/views/echarts/bar.vue'),
            meta: {
              title: '柱状图',
            },
          },
          {
            path: '/otherChart',
            name: 'OtherChart',
            component: () => import('@/views/echarts/other.vue'),
            meta: {
              title: '柱状图',
            },
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
