/**
 * 主题全局配置
 */
import { themeConfig } from '@/config/theme'
const { mode, theme, fixedHead, fullScreen, refresh, collapse, notice, isBreadcrumb, isLogo, tag } =
  themeConfig

const state = {
  isFullScreen: false, // 是否显示全屏
  routerView: true, // 是否显示路由
  tag: true, // 是否显示标签
  collapse,
  fixedHead,
  tag,
  theme,
}

const getters = {
  isFullScreen: (state) => state.isFullScreen,
  fixedHead: (state) => state.fixedHead,
  tag: (state) => state.tag,
  theme: (state) => state.theme,
  routerView: (state) => state.routerView,
}

const mutations = {
  CHANGE_FULL_SCREEN(state, flag) {
    state.isFullScreen = flag
  },
  SET_ROUTER_VIEW(state, flag) {
    state.routerView = flag
  },
  CHANGE_TAG(state, flag) {
    state.tag = flag
  },
  CHANGE_COLLAPSE(state) {
    state.collapse = !state.collapse
  },
}

const actions = {
  /**
   * 切换是否全屏
   * @param {*} flag true|false
   */
  changeFullScreen: ({ commit }, flag) => {
    commit('CHANGE_FULL_SCREEN', flag)
  },
  // 重新加载
  setRouterView: ({ commit }, flag) => {
    commit('SET_ROUTER_VIEW', flag)
  },
  setTag: ({ commit }, flag) => {
    commit('CHANGE_TAG', flag)
  },
  // 展开收起菜单栏
  changeCollapse({ commit }) {
    commit('CHANGE_COLLAPSE')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
