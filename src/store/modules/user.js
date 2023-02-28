import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken'
import { getUserInfo, login } from '@/api/user'
import { resetRouter } from '@/router'
import { setting } from '@/config/setting'
const { tokenName } = setting
const state = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  permissions: [], // 权限菜单集合
}

const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  permissions: (state) => state.permissions,
}

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}

const actions = {
  // 存储菜单权限
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  // 登录
  async login({ commit }, userParams) {
    const { data } = await login(userParams)
    const accessToken = data[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
      // this.$Message.message('登录成功')
    } else {
      this.$Message.error(`登录接口异常，未正确返回${tokenName}...`)
    }
  },
  // 退出
  async logout({ dispatch }) {
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  // 通过接口获取用户信息
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken)
    if (!data) {
      window.$Message.error('验证失败,请重新登录')
      return false
    }
    let { permissions, username, avatar } = data
    if (permissions?.length) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    }
    return false
  },
  // 清空token
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}

export default { state, getters, mutations, actions }
