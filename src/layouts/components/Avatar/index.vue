<template>
  <el-dropdown @command="handleCommand">
    <div class="avatar-dropdown">
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name">
        {{ userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="github">Github</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()
const avatar = ref('https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
const userName = ref('搬运工')

const handleCommand = (val) => {
  console.log(val)
  switch (val) {
    case 'logout':
      logout()
      break
    default:
      break
  }

  function logout() {
    ElMessageBox.confirm('您确定要退出系统吗', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
      type: 'warning',
    }).then(async () => {
      await store.dispatch('user/logout')
      location.replace('/login')
    })
  }
}
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: $base-avatar-dropdown-height;
  padding: $base-padding-10;
  .user-avatar {
    width: $base-avatar-widht;
    height: $base-avatar-height;
    cursor: pointer;
    border-radius: $base-border-radius-circle;
  }

  .user-name {
    position: relative;
    margin-left: $base-margin-5;
    margin-left: $base-margin-5;
    cursor: pointer;
  }
}
</style>
