<template>
  <view class="login-container">登录</view>
</template>

<script>
import { login } from '@/api/login.js';
export default {
  data() {
    return {};
  },
  onLoad() {
    this.handleLogin();
  },
  methods: {
    async handleLogin() {
      const sendObj = {};
      const { data } = await login();
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
