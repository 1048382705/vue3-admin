<template>
  <el-form :model="ruleForm" :rules="rules" ref="validateForm" class="login-ruleForm">
    <el-form-item prop="username">
      <el-input placeholder="账号" v-model="ruleForm.username">
        <template #prefix>
          <icon-user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter="handleLogin"
        placeholder="密码"
        type="password"
        v-model="ruleForm.password">
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="login-check">
        <el-checkbox v-model="checkedPwd">记住密码</el-checkbox>
        <el-button text type="primary">忘记密码</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" class="login-btn" round @click="handleLogin"
        >登录</el-button
      >
    </el-form-item>
    <el-divider>第三方登录</el-divider>
    <el-form-item>
      <div class="login-methods">
        <icon-wechat theme="outline" size="24" fill="#333" />
        <icon-alipay theme="outline" size="24" fill="#333" />
        <icon-github theme="outline" size="24" fill="#333" />
        <icon-twitter theme="outline" size="24" fill="#333" />
        <icon-google theme="outline" size="24" fill="#333" />
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref, toRefs, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const validateForm = ref(null)
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      ruleForm: {
        username: 'admin',
        password: 'admin',
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },

      checkedPwd: false,
      loading: false,
      redirect: '',
    })

    watch(
      () => router.currentRoute,
      ({ _value }) => {
        const route = _value
        state.redirect = (route.query && route.query.redirect) || '/'
      },
      { immediate: true }
    )

    const handleLogin = async () => {
      const form = unref(validateForm)
      if (!form) return
      console.log('form', form)
      await form.validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          state.loading = true
          store
            .dispatch('user/login', state.ruleForm)
            .then(() => {
              console.log('成功')
              const routerPath =
                state.redirect === '/404' || state.redirect === '/401' ? '/' : state.redirect
              state.loading = false
              router.push(routerPath).catch(() => {})
            })
            .catch(() => {
              state.loading = false
            })
        }
      })
    }

    return {
      ...toRefs(state),
      validateForm,
      handleLogin,
    }
  },
}
</script>

<style lang="scss" scoped>
.login-ruleForm {
  margin-top: 1rem;
  :deep(.el-input__prefix) {
    top: 2px;
    padding: 0 4px;
  }
  .login-methods {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .login-btn {
    width: 100%;
  }
  .login-check {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
}
</style>
