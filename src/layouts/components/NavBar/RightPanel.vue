<template>
  <div class="right-panel">
    <icon-theme class="icon-hover theme" theme="outline" :strokeWidth="4" size="16" fill="#666" />
    <el-popover placement="bottom" :width="320" trigger="hover">
      <template #reference>
        <icon-remind
          class="icon-hover refresh"
          theme="outline"
          size="16"
          fill="#666"
          :strokeWidth="3" />
      </template>
      <div class="message-box">
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="通知" name="first">
            <!-- <Cell :list="noticeList" /> -->
          </el-tab-pane>
          <el-tab-pane label="消息" name="second">暂无消息</el-tab-pane>
          <el-tab-pane label="邮件" name="third">暂无邮件</el-tab-pane>
        </el-tabs>
      </div>
    </el-popover>

    <FullScreen @refresh="onRefresh" />
    <icon-refresh
      title="刷新"
      @click="handleRefresh"
      class="icon-hover refresh"
      theme="filled"
      size="16"
      fill="#666"
      :strokeWidth="4" />

    <Avatar />
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import FullScreen from '@/components/FullScreen.vue'
import Avatar from '../Avatar/index.vue'

let activeName = ref('first')
const store = useStore()
const onRefresh = () => {}

//刷新方法
const handleRefresh = () => {
  store.dispatch('setting/setRouterView', false)
  nextTick(() => {
    store.dispatch('setting/setRouterView', true)
  })
}
</script>

<style lang="scss" scoped>
.right-panel {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  height: $base-nav-bar-height;
  .msg-badge {
    :deep(.el-badge__content.is-fixed) {
      right: calc(10px + var(--el-badge-size) / 2);
    }
  }
  .refresh,
  .theme {
    padding: $base-padding-20-10;
  }
}
.message-box {
  padding: $base-padding-5-15;
  :deep(.el-tabs__active-bar) {
    width: $base-tab-width_active !important;
  }
}
</style>
