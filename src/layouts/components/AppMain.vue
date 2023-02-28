<template>
  <div class="app-main-container" v-if="store.getters['setting/routerView']">
    <router-view class="app-main-height"></router-view>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped>
.app-main-container {
  position: relative;
  box-sizing: border-box;
  width: $base-width;
  overflow: hidden;
  text-align: left;
  .app-main-height {
    min-height: $app-main-min-height;
  }
}
</style>
