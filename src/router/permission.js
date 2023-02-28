/**
 * 路由控制
 */

import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setting } from '@/config/setting'

const { authentication, loginInterception, progressBar, routesWhiteList, recordRoute } = setting

// 配置顶部进度条
NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})

// 路由前置导航
router.beforeEach(async (to, from, next) => {
  //是否开启进度条
  if (progressBar) NProgress.start()
  // 获取token
  let hasToken = store.getters['user/accessToken']
  // 是否开启登录拦截
  if (!loginInterception) hasToken = true

  console.log('hasToken', hasToken)
  // 有token
  if (hasToken) {
    // 如果是登录页直接放行
    if (to.path === '/login') {
      next({ path: '/' })
      if (progressBar) NProgress.done()
    } else {
      const hasPermissions = store.getters['user/permissions']?.length > 0
      if (hasPermissions) {
        next()
      } else {
        // 进入首页的逻辑
        try {
          // 获取用户权限
          let permissions
          // 如果不开启登录拦截默认设置admin
          if (!loginInterception) {
            console.log('进1')
            await store.dispatch('user/setPermissions', ['admin'])
            permissions = ['admin']
          } else {
            console.log('进2')
            // 通过接口获取用户权限
            permissions = await store.dispatch('user/getUserInfo')
          }
          console.log('permissions', permissions)

          let accessRoutes = []
          // authentication: intelligence前端控制路由;all后端控制路由
          if (authentication === 'intelligence') {
            accessRoutes = await store.dispatch('routes/setRoutes', permissions)
          } else if (authentication === 'all') {
            accessRoutes = await store.dispatch('routes/setAllRoutes')
          }
          accessRoutes.forEach((item) => {
            router.addRoute(item)
          })
          next({ ...to, replace: true })
        } catch {
          // 清空token
          await store.dispatch('user/resetAccessToken')
          if (progressBar) NProgress.done()
        }
      }
    }
  } else {
    // 无token
    // 免登录路由
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // token失效回退到登录页是否记录本次的路由
      if (recordRoute) {
        next(`/login?redirect=${to.path}`)
      } else {
        next('/login')
      }
      if (progressBar) NProgress.done()
    }
  }

  document.title = to.meta.title
})

// 路由后置导航
router.afterEach(() => {
  if (progressBar) NProgress.done()
})
