<template>
  <div
    @click="handleClick"
    class="logo-wrapper"
    :class="{ unfold: collapse, horizontal: mode === 'horizontal' }">
    <!-- <svg-icon name="vue" size="35px" /> -->
    <img class="icon" src="@/assets/logo.png" alt="" />
    <span class="logo-title" :style="{ color: '#fff' }" v-if="!collapse"> vue3-admin </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const collapse = computed(() => {
  return store.getters.collapse
})

const mode = computed(() => {
  return store.getters['setting/mode']
})

const handleClick = () => {
  router.replace('/')
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $base-logo-width;
  cursor: pointer;
  &.unfold {
    width: $base-unfold-width;
    padding: $base-padding-10 0;
  }
  &.horizontal {
    justify-content: flex-start;
  }

  .icon {
    width: 30px;
    height: 30px;
  }
  .logo-title {
    display: inline-block;
    max-width: calc(246px - 60px);
    padding-left: $base-padding-10;
    overflow: hidden;
    font-size: $base-font-size-max;
    line-height: $base-logo-height;
    color: #333;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
}
</style>
