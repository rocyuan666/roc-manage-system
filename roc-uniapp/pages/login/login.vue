<template>
  <view class="login-container"><button type="primary" size="mini" @click="handleLogin">登录</button></view>
</template>

<script>
import { login } from '@/api/login.js'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: false,
        code: '',
        uuid: '',
      },
    }
  },
  methods: {
    ...mapActions({
      login: 'user/Login',
    }),
    async handleLogin() {
      try {
        const token = await this.login(this.loginForm)
        console.log('登录成功')
      } catch (err) {
        console.log('登录失败', err)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
