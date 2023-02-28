<template>
  <div id="tabs-bar-container" class="tabs-bar-container">
    <el-tabs
      v-model="tabActive"
      type="card"
      class="tabs-content"
      @tab-click="tabClick"
      @tab-remove="tabRemove">
      <el-tab-pane
        v-for="item in visitedRouteList"
        :key="item.path"
        :name="item.path"
        :closable="!isAffix(item)">
        <template #label>
          <div class="item">
            <component
              class="menu-icon"
              v-if="item.meta.icon"
              theme="outline"
              strokeWidth="3"
              :is="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-popover
      placement="bottom"
      width="auto"
      trigger="hover"
      @show="popoverShow"
      @hide="popoverHide">
      <template #reference>
        <span class="more" :class="{ active: visible }">
          <icon-all-application theme="filled" size="18" :strokeWidth="3" />
        </span>
      </template>
      <div
        class="command-item"
        v-for="(item, index) in commandList"
        :key="index"
        @click="handleCommand(item.command)">
        <component class="icon" theme="filled" size="14" :strokeWidth="3" :is="item.icon" />
        <span class="command-label">{{ item.text }}</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { reactive, watch, toRefs, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    //响应式数据
    const state = reactive({
      affixtabs: [],
      tabActive: '',
      visible: false,
      commandList: [
        {
          command: 'refreshRoute',
          text: '重新加载',
          icon: 'icon-refresh',
        },
        {
          command: 'closeOtherstabs',
          text: '关闭其他',
          icon: 'icon-close',
        },
        {
          command: 'closeLefttabs',
          text: '关闭左侧',
          icon: 'icon-to-left',
        },
        {
          command: 'closeRighttabs',
          text: '关闭右侧',
          icon: 'icon-to-right',
        },
        {
          command: 'closeAlltabs',
          text: '关闭所有',
          icon: 'icon-minus',
        },
      ],
    })

    // 获取路由数据
    const routes = computed(() => {
      return store.getters['routes/routes']
    })

    // 获取已添加的tabs
    const visitedRouteList = computed(() => {
      return store.getters['tabsBar/visitedRoutes']
    })

    // 初始化tabs
    const initTabs = () => {
      let affixtabs = (state.affixtabs = filterAffixtabs(routes.value))
      affixtabs.forEach((tag) => {
        if (tag.name) {
          store.dispatch('tabsBar/addVisitedRoute', tag)
        }
      })
    }
    // 添加tab
    const addTabs = () => {
      const { name } = router.currentRoute.value
      if (name) {
        store.dispatch('tabsBar/addVisitedRoute', router.currentRoute.value)
      }
    }

    // 重新加载tabs
    const refreshRoute = () => {
      store.dispatch('setting/setRouterView', false)
      nextTick(() => {
        store.dispatch('setting/setRouterView', true)
      })
    }
    // 关闭其他tabs
    const closeOtherstabs = async () => {
      const view = await toThisTag()
      await store.dispatch('tabsBar/delOthersRoutes', view)
    }
    // 关闭左侧tabs
    const closeLefttabs = async () => {
      const view = await toThisTag()
      await store.dispatch('tabsBar/delLeftRoutes', view)
    }
    // 关闭右侧tabs
    const closeRighttabs = async () => {
      const view = await toThisTag()
      await store.dispatch('tabsBar/delRightRoutes', view)
    }
    // 关闭所有tabs
    const closeAlltabs = async () => {
      const view = await toThisTag()
      const { visitedRoutes } = await store.dispatch('tabsBar/delAllRoutes')
      console.log('')
      if (state.affixtabs.some((item) => item.path === view.path)) {
        return
      }
      toLastTag(visitedRoutes)
    }

    const toThisTag = () => {
      const { fullPath, path } = router.currentRoute.value
      let currentPath = visitedRouteList.value.find((item) => item.fullPath === fullPath)
      if (path !== currentPath.path) router.push(currentPath)
      return currentPath
    }

    // 监听路由变化
    watch(
      () => router.currentRoute.value,
      () => {
        initTabs()
        addTabs()
        state.tabActive = visitedRouteList.value.find(
          (item) => item.path === router.currentRoute.value.path
        )?.path
      },
      { immediate: true }
    )

    const isAffix = (tag) => {
      return tag.meta && tag.meta.affix
    }

    // 点击tabs的逻辑
    const tabClick = (tabActive) => {
      console.log(tabActive.index)
      let route = visitedRouteList.value.find((item, index) => index == tabActive.index)
      if (router.currentRoute.value.path !== route.path) {
        router.push({
          path: route.path,
          query: route.query,
          fullPath: route.fullPath,
        })
      }
    }

    // 删除tab
    const tabRemove = async (tabActive) => {
      let currentRoute = visitedRouteList.value.find((item) => item.path === tabActive)
      const { visitedRoutes } = await store.dispatch('tabsBar/delRoute', currentRoute)
      console.log('visitedRoutes', visitedRoutes)
      if (isActive(currentRoute)) toLastTag(visitedRoutes)
    }

    // 对tab标签的操作
    const handleCommand = (command) => {
      switch (command) {
        case 'refreshRoute':
          // 重新加载
          refreshRoute()
          break
        case 'closeOtherstabs':
          // 关闭其他
          closeOtherstabs()
          break
        case 'closeLefttabs':
          // 关闭左侧
          closeLefttabs()
          break
        case 'closeRighttabs':
          // 关闭右侧
          closeRighttabs()
          break
        case 'closeAlltabs':
          // 关闭所有
          closeAlltabs()
          break
        default:
          return '错误的事件类型'
      }
    }

    const popoverShow = () => {
      state.visible = true
    }
    const popoverHide = () => {
      state.visible = false
    }

    // 获取被删除的路由的上一个路由信息
    function toLastTag(visitedRoutes) {
      let route = visitedRoutes.slice(-1)[0]
      if (route) router.push(route)
      else router.push('/')
    }

    // 获取具有Affixt属性的路由 (Affixt:true表示默认进入系统就添加到tab标签里)
    function filterAffixtabs(routes) {
      let tabs = []
      routes.forEach((route) => {
        if (route?.meta?.affix) {
          tabs.push({
            fullPath: route.path,
            path: route.path,
            name: route.name,
            meta: { ...route.meta },
          })
        }
        if (route?.children) {
          let children = filterAffixtabs(route.children)
          if (children?.length > 0) {
            tabs = [...tabs, ...children]
          }
        }
      })
      return tabs
    }
    // 判断点击的路由是否是当前路由
    function isActive(route) {
      return route.path === router.currentRoute.value.path
    }

    return {
      ...toRefs(state),
      visitedRouteList,
      isAffix,
      tabClick,
      tabRemove,
      popoverShow,
      popoverHide,
      handleCommand,
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs-bar-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: $base-tabs-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  user-select: none;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;
  &.horizontal {
    padding: 0 40px;
  }
  :deep(.fold-unfold) {
    margin-right: $base-padding;
  }
  :deep(.el-tabs__item) {
    display: inline-flex;
    align-items: center;
  }
  .item {
    display: inline-flex;
    align-items: center;
    .menu-icon {
      display: flex;
      padding-right: $base-margin-5;
    }
  }

  .tabs-content {
    width: calc(100% - 90px);
    height: $base-tag-item-height;
    :deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
    }
    :deep(.el-tabs__header) {
      border-bottom: 0;
      .el-tabs__nav {
        border: 0;
        .el-tabs__item {
          box-sizing: border-box;
          height: $base-tag-item-height;
          margin-right: $base-margin-5;
          line-height: $base-tag-item-height;
          border: none;
          border-radius: $base-border-radius;
          transition: padding 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
          &.is-active {
            color: $base-color-primary;
            background: $base-color-primary-light9;
            border: none;
            border-bottom: 2px solid;
          }
          &:hover {
            color: $base-color-primary;
            background: $base-color-primary-light9;
            border: none;
            border-bottom: 2px solid;
          }
        }
      }
    }
  }
}
.command-item {
  display: flex;
  align-content: center;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  .command-label {
    padding-left: 5px;
  }
  &:hover {
    color: $base-color-primary;
    background-color: $base-color-primary-light9;
  }
  .icon {
    display: flex;
  }
}
.more {
  display: flex;
  align-content: center;
  align-items: center;
  color: $base-font-color;
  cursor: pointer;
  transition: all 0.5s;
  &.active {
    color: $base-color-primary !important;
    transform: rotate(180deg);
  }
}
</style>
