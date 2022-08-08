<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="/static/img/b-1.png"></image>
		<image class="img-b" src="/static/img/b-2.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">{{ subTitle }}</view>
		<form class="cl">
			<!-- 登录账号 -->
			<view class="login-form-item">
				<u-input v-model="username" placeholder="请输入登录用户名" maxlength="30">
					<u-icon slot="prefix" name="account" size="35px"></u-icon>
				</u-input>
			</view>
			<!-- 登录密码 -->
			<view class="login-form-item">
				<u-input v-model="password" type="password" placeholder="请输入登录密码" maxlength="16">
					<u-icon slot="prefix" name="lock" size="35px"></u-icon>
				</u-input>
			</view>
			<!-- 图形验证码 -->
			<view class="login-form-item t-captcha">
				<u-input v-model="captchaCode" type="number" placeholder="请输入验证码" maxlength="4">
					<u-icon slot="prefix" name="fingerprint" size="35px"></u-icon>
				</u-input>
				<image :src="captcha" @click="getCaptcha" class="t-captcha-img"></image>
			</view>
			<button @tap="login()">登 录</button>
		</form>
	</view>
</template>
<script>
import * as CaptchaApi from '@/api/captcha'
import { isEmpty } from '@/utils/verify.js'

export default {
	data() {
		return {
			title: '大鹏管理系统',
			subTitle: '欢迎回来，开始工作吧！',
			// 图形验证码信息
			captcha: null,
			// 登录账号
			username: 'admin',
			// 密码
			password: 'admin123',
			// 图形验证码
			captchaCode: '',
			uuid: ''
		};
	},
	created() {
	  // 获取图形验证码
	  this.getCaptcha()
	},
	methods: {
		// 获取图形验证码
		getCaptcha() {
			const app = this
			CaptchaApi.image().then(result => {
				app.captcha = 'data:image/gif;base64,' + result.img
				app.uuid = result.uuid
			})
		},
		// 验证表单内容
		validItem() {
			const app = this
			if (isEmpty(app.username)) {
				uni.$u.toast('请输入登录用户名')
				return false
			}
			if (isEmpty(app.password)) {
				uni.$u.toast('请输入登录密码')
				return false
			}
			if (isEmpty(app.captchaCode)) {
				uni.$u.toast('请输入验证码')
				return false
			}
			return true
		},
		// 确认登录
		login() {
      const app = this
			let valid = app.validItem();
			if (valid) {
				app.isLoading = true
				app.$store.dispatch('Login', {
				  username: app.username,
				  password: app.password,
				  code: app.captchaCode,
				  uuid: app.uuid
				}).then(result => {
					uni.switchTab({
						url: '/pages/index/index',
						fail(err) {
							console.log(err)
						}
					})
				})
				.catch(err => {
					app.captchaCode = ''
					app.getCaptcha()
				})
				.finally(() => app.isLoading = false)
			}
		},
	}
};
</script>
<style lang="scss" scoped>
.t-login {
	width: 650rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

::v-deep .login-form-item .u-input {
  padding: 0 10px 0 62px;
	height: 32px;
	line-height: 32px;
	margin-bottom: 26px;
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 14px;
	border-radius: 26px;
}

.t-captcha {
	display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.t-captcha-img {
  margin-left: 16px;
	width: 102px;
	height: 44px;
}
.img-a {
	position: absolute;
	width: 100%;
	top: -150rpx;
	right: 0;
	z-index: -999;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	z-index: -999;
}

.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login .t-b {
	text-align: left;
	font-size: 56rpx;
	color: #000;
	padding: 300rpx 0 20rpx 0;
	font-weight: bold;
}
.t-login .t-b2 {
	text-align: left;
	font-size: 32rpx;
	color: #aaaaaa;
	padding: 0rpx 0 60rpx 0;
}

.t-login .uni-input-placeholder {
	color: #000 !important;
}
</style>
