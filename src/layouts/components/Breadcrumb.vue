<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in list" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let list = computed(() => {
  const { matched } = router.currentRoute.value
  //获取当前的路由地址实例
  return matched.filter((item) => item.name && item.meta.title)
})
// console.log('list', list)
</script>

<style lang="scss" scoped></style>
