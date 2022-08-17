<template>
  <view class="login-container">
    <roc-navbar title="登录"></roc-navbar>
    <view class="title-box">
      <view>你好，</view>
      <view>欢迎登录系统！</view>
    </view>
    <view class="login-main">
      <view class="label">用户名</view>
      <view class="input-box">
        <input
          placeholder="请输入用户名"
          placeholder-class="plhd"
          type="text"
          v-model="loginForm.username"
        />
      </view>
      <view class="label">密码</view>
      <view class="input-box">
        <input
          placeholder="请输入密码"
          :password="true"
          placeholder-class="plhd"
          type="text"
          v-model="loginForm.password"
        />
      </view>
      <view class="label">验证码</view>
      <view class="input-box">
        <input
          placeholder="请输入验证码"
          placeholder-class="plhd"
          type="number"
          v-model="loginForm.code"
        />
        <image class="code-img" :src="codeUrl" @click="getCode" mode="widthFix"></image>
      </view>
      <button class="btn-login" type="primary" @click="handleLogin">登录</button>
      <!-- <view class="link-box">
        <view class="ljzc">立即注册</view>
        <view class="wjmm">忘记密码？</view>
      </view> -->
    </view>
  </view>
</template>

<script>
import { login, getCodeImg } from '@/api/login.js'
import { mapActions } from 'vuex'
import { tokenKey } from '@/common/config.js'

export default {
  data() {
    return {
      codeUrl: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: '',
      },
      // 验证码开关
      captchaEnabled: true,
    }
  },
  onLoad() {
    this.getCode()
  },
  onShow() {
    if (this.$roc.getStorage(tokenKey)) {
      this.$roc.route({
        type: 'tab',
        url: '/pages/index/index',
      })
    }
    // 工具集
    // console.log(this.$roc)
  },
  methods: {
    ...mapActions({
      login: 'Login',
    }),
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
        if (this.captchaEnabled) {
          this.codeUrl = 'data:image/gif;base64,' + res.img
          this.loginForm.uuid = res.uuid
        }
      })
    },
    async handleLogin() {
      try {
        const token = await this.login(this.loginForm)
        this.$roc.route({
          type: 'tab',
          url: '/pages/index/index',
        })
      } catch (err) {
        if (this.captchaEnabled) {
          this.getCode()
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
page {
  .login-container {
    background: url(../../static/images/login-bg.jpg) no-repeat;
    background-size: 100% 360rpx;
    background-position: 0 42px;
    .title-box {
      font-size: 48rpx;
      color: #fff;
      font-weight: bold;
      line-height: 1.5;
      padding: 82rpx 0 54rpx 60rpx;
    }
    .login-main {
      padding: 42rpx 70rpx 100rpx;
      background-color: #fff;
      border-radius: 60rpx 60rpx 0 0;
      .label {
        font-size: 32rpx;
        color: #101010;
        padding-bottom: 20rpx;
        padding-top: 40rpx;
      }
      .input-box {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(204, 204, 204, 0.4);
        padding-bottom: 24rpx;
        input {
          flex: 1;
          font-size: 28rpx;
          color: #aaa;
        }
        .plhd {
          color: #aaa;
        }
        .code-img {
          width: 200rpx;
        }
      }
      .btn-login {
        height: 90rpx;
        line-height: 90rpx;
        border-radius: 12rpx;
        background-color: $uni-primary;
        font-size: 32rpx;
        color: #fff;
        margin-top: 66rpx;
      }
      .link-box {
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
        padding-top: 32rpx;
        .ljzc {
          color: $uni-primary;
        }
        .wjmm {
          color: #999;
        }
      }
    }
  }
}
</style>
