import { constantRoutes, asyncRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'

const state = {
  routes: [],
}

const getters = {
  routes: (state) => state.routes,
}

const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  // 获取需要遍历的权限菜单(asyncRoutes)再根据用户自身是否有权需要查看的菜单(permissions)进行遍历
  async setRoutes({ commit }, permissions) {
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions)
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
  // 通过接口获取所有路由菜单
  async setAllRoutes({ commit }) {
    let { data } = await getRouterList()
    let accessRoutes = convertRouter(data)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
}

export default { state, getters, mutations, actions }
