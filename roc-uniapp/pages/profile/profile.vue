<template>
  <view class="profile-container">
    <roc-navbar title="个人信息"></roc-navbar>
    <view class="row">
      <view class="left">头像</view>
      <view class="right">
        <view class="header-img">
          <image
            :src="user.avatar == '' ? '../../static/images/top_user_img.jpg' : user.avatar"
            mode=""
          ></image>
        </view>
      </view>
    </view>
    <view class="row">
      <view class="left">昵称</view>
      <view class="right"><input class="input-dom" type="text" v-model="user.nickName" /></view>
    </view>
    <view class="row" @click="sexIsShow = true">
      <view class="left">性别</view>
      <view class="right">
        <view class="text">{{ sexList[user.sex] }}</view>
        <image class="icon-more" src="../../static/images/arrow.svg" mode=""></image>
      </view>
    </view>
    <view class="row">
      <view class="left">手机号码</view>
      <view class="right">
        <input
          class="input-dom"
          placeholder="请输入手机号码"
          type="text"
          v-model="user.phonenumber"
        />
      </view>
    </view>
    <view class="row">
      <view class="left">用户邮箱</view>
      <view class="right">
        <input class="input-dom" placeholder="请输入邮箱" type="text" v-model="user.email" />
      </view>
    </view>
    <!-- other-cpn -->
    <u-picker
      v-model="sexIsShow"
      mode="selector"
      confirm-color="#0F965B"
      :range="sexList"
      @confirm="confirmSex"
    ></u-picker>
  </view>
</template>

<script>
import { getUserProfile } from '@/api/system/user.js'

export default {
  data() {
    return {
      user: {},
      sexIsShow: false,
      sexList: ['男', '女'],
    }
  },
  onLoad() {
    this.getUser()
  },
  computed: {
    sexType() {
      return this.sexList[this.user.sex]
    },
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
      })
    },
    confirmSex(e) {
      this.user.sex = e[0]
    },
  },
}
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
  .profile-container {
    padding: 0 24rpx;
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx 0;
      border-bottom: 1px solid #f0f0f0;
      .left {
        width: 180rpx;
        font-size: 32rpx;
        color: #101010;
      }
      .right {
        display: flex;
        align-items: center;
        .header-img {
          width: 80rpx;
          height: 80rpx;
          border-radius: 40rpx;
          overflow: hidden;
          image {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .u-input {
          width: 400rpx;
          margin-right: 20rpx;
        }
        .text,
        .input-dom {
          font-size: 28rpx;
          color: #979797;
          margin-right: 20rpx;
        }
        .input-dom {
          text-align: right;
        }
        .icon-more {
          display: block;
          width: 28rpx;
          height: 28rpx;
        }
      }
    }
  }
}
</style>
