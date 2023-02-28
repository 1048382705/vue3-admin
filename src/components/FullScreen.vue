<template>
  <span class="icon-hover full-screen-wrapper" title="全屏">
    <component
      theme="filled"
      size="16"
      fill="#666"
      :strokeWidth="4"
      :is="(isFullScreen ? 'icon-off' : 'icon-full') + '-screen'"
      @click="handleClick" />
  </span>
</template>

<script setup>
import { computed } from 'vue'
import screenfull from 'screenfull'
import { useStore } from 'vuex'

const store = useStore()

let isFullScreen = computed(() => {
  console.log('store', store)
  return store.getters['setting/isFullScreen']
})
console.log('isFullScreen', isFullScreen)
// 定义emit事件发送给父组件
const emit = defineEmits(['refresh'])
const handleClick = () => {
  if (!screenfull.isEnabled) {
    this.$Message.warning('进入全屏失败')
    return
  }
  store.dispatch('setting/changeFullScreen', !isFullScreen.value)
  screenfull.toggle()
  emit('refresh', screenfull.isFullscreen)
}
</script>

<style lang="scss" scoped>
.full-screen-wrapper {
  padding: 20px 10px;
}
</style>
