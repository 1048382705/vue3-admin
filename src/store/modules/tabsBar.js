const state = {
  visitedRoutes: [],
}

const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
}

const mutations = {
  addVisitedRoute(state, route) {
    let target = state.visitedRoutes.find((item) => item.path === route.path)
    if (target) return
    state.visitedRoutes.push(Object.assign({}, route))
  },
  delVisitedRoute(state, route) {
    state.visitedRoutes.forEach((item, index) => {
      if (item.path === route.path) {
        state.visitedRoutes.splice(index, 1)
      }
    })
  },
  delOthersVisitedRoute(state, route) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (item) => item.meta.affix || item.path === route.path
    )
  },
  delLeftVisitedRoute(state, route) {
    let index = state.visitedRoutes.length
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
      return item.meta.affix || index <= state.visitedRoutes.indexOf(item)
    })
  },
  delRightVisitedRoute(state, route) {
    let index = state.visitedRoutes.length
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
      return item.meta.affix || index >= state.visitedRoutes.indexOf(item)
    })
  },
  delAllVisitedRoute(state) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta?.affix)
  },
}

const actions = {
  // 添加tab标签
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route)
  },
  async delRoute({ dispatch, state }, route) {
    await dispatch('delVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes],
    }
  },
  delVisitedRoute({ commit }, route) {
    commit('delVisitedRoute', route)
  },
  async delOthersRoutes({ dispatch, state }, route) {
    await dispatch('delOthersVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes],
    }
  },
  delOthersVisitedRoute({ commit, state }, route) {
    commit('delOthersVisitedRoute', route)
    return [...state.visitedRoutes]
  },
  async delLeftRoutes({ dispatch }, route) {
    await dispatch('delLeftVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes],
    }
  },
  delLeftVisitedRoute({ commit }, route) {
    commit('delLeftVisitedRoute', route)
    return [...state.visitedRoutes]
  },
  async delRightRoutes({ dispatch, state }, route) {
    await dispatch('delRightVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes],
    }
  },
  delRightVisitedRoute({ commit, state }, route) {
    commit('delRightVisitedRoute', route)
    return [...state.visitedRoutes]
  },
  async delAllRoutes({ dispatch }) {
    await dispatch('delAllVisitedRoute')
    return {
      visitedRoutes: [...state.visitedRoutes],
    }
  },
  delAllVisitedRoute({ commit }) {
    commit('delAllVisitedRoute')
  },
}

export default { state, getters, mutations, actions }
