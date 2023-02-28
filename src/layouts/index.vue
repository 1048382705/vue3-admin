<template>
  <div class="admin-container">
    <el-container>
      <Menu class="hidden-xs-only" :isCollapse="isCollapse" />
      <el-container class="container" :style="{ left: isCollapse ? '65px' : '240px' }">
        <el-header
          class="header"
          height="60px"
          :class="{ fixed: fixedHead, notag: !tag }"
          :style="{ left: isCollapse ? '65px' : '240px' }">
          <NavBar @handleCollapse="handleCollapse"></NavBar>
          <TabBar />
        </el-header>
        <el-main class="main" :class="{ fixed: fixedHead, notag: !tag }">
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from './components/Menu.vue'
import AppMain from './components/AppMain.vue'
import NavBar from './components/NavBar/index.vue'
import TabBar from './components/TabBar/index.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isCollapse = computed(() => {
  return store.getters.collapse
})
const fixedHead = computed(() => {
  return store.getters['setting/fixedHead']
})
const tag = computed(() => {
  return store.getters['setting/tag']
})

const handleCollapse = () => {
  store.dispatch('setting/changeCollapse')
}
</script>

<style lang="scss" scoped>
.admin-container {
  position: relative;
  background-color: $base-content-bg-color;
  .container {
    position: absolute;
    right: 0;
    transition: all $base-transition-time-4;
  }
  .header {
    padding: 0;
    transition: all $base-transition-time-4;
    &.fixed {
      position: fixed;
      top: 0;
      right: 0;
      z-index: $base-z-index-999;
    }
  }
  .main {
    position: relative;
    top: $base-main-vertical-top;
    overflow-y: auto;
    &.fixed {
      top: $base-main-fixed-top;
    }
    &[class='el-main main fixed notag'] {
      top: $base-main-vertical-fixed-notag-top;
    }
    &[class='el-main main notag'] {
      top: $base-main-notag-top;
    }
    background-color: $base-content-bg-color;
  }
}
</style>
