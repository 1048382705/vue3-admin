<template>
  <div class="errorPage-container">
    <el-row :gutter="10" class="error-row">
      <el-col class="error-col" :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <!-- <div class="error-img">
          <img v-if="type === '401'" src="@/assets/error/401.svg" class="img" :alt="type" />
          <img v-if="type === '404'" src="@/assets/error/404.svg" class="img" :alt="type" />
        </div> -->
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <div class="error-content">
          <!-- <h2 class="error-title">{{ t('errorPages.title') }}</h2> -->
          <h2 class="error-title">{{ '错误' }}</h2>
          <h3>{{ title }}</h3>
          <p class="desc">{{ msg }}</p>
          <div class="btn">
            <el-button type="primary" @click="handleBack">返回首页</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({
  type: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  msg: {
    type: String,
    default: '错误',
  },
})

const router = useRouter()

const handleBack = () => {
  router.replace('/')
}
</script>

<style lang="scss" scoped></style>
