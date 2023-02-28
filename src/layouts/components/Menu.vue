<template>
  <el-scrollbar height="100vh">
    <el-menu
      class="el-menu-vertical"
      :class="{ 'is-black': isBlack }"
      :default-active="defaultActive"
      :background-color="menuBgColor"
      :mode="mode"
      :collapse="isCollapse"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      router>
      <Logo />
      <template v-for="item in routes">
        <template v-if="!item.hidden">
          <menu-item :item="item" :key="item.path" />
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Menu',
}
</script>
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Logo from './Logo/index.vue'
import MenuItem from './MenuItem.vue'
import { themeConfig } from '@/config/theme'
const { themeOptions } = themeConfig
defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'vertical',
  },
})
const store = useStore()
const router = useRouter()
const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)']

const routes = computed(() => {
  return store.getters['routes/routes']
})
const defaultActive = computed(() => {
  // 当前路由
  const { fullPath } = router.currentRoute.value
  return fullPath || '/index'
})
const theme = computed(() => {
  return store.getters['setting/theme']
})
const menuBgColor = computed(() => {
  return themeOptions[theme.value].menuBgColor
})
const textColor = computed(() => {
  return whiteColors.indexOf(menuBgColor.value) !== -1 ? '#333' : '#fff'
})
const activeTextColor = computed(() => {
  const mcolor = whiteColors.indexOf(menuBgColor.value) !== -1
  return mcolor ? theme : '#fff'
})
const isBlack = computed(() => {
  return whiteColors.indexOf(menuBgColor.value) === -1
})
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  @include base-scrollbar;
  &:not(.el-menu--collapse) {
    width: $base-menu-width;
  }
}
</style>
