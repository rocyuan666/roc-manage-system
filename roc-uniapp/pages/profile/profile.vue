<template>
  <view class="profile-container">
    <roc-navbar title="个人信息"></roc-navbar>
    <view class="row">
      <view class="left">头像</view>
      <view class="right">
        <view class="header-img">
          <image src="../../static/images/top_user_img.jpg" mode=""></image>
        </view>
      </view>
    </view>
    <view class="row">
      <view class="left">昵称</view>
      <view class="right"><input class="input-dom" type="text" v-model="userInfo.name" /></view>
    </view>
    <view class="row" @click="sexIsShow = true">
      <view class="left">性别</view>
      <view class="right">
        <view class="text">{{ sexType }}</view>
        <image class="icon-more" src="../../static/images/arrow.svg" mode=""></image>
      </view>
    </view>
    <view class="row" @click="dateIsShow = true">
      <view class="left">生日</view>
      <view class="right">
        <view class="text">{{ birthday }}</view>
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
          v-model="userInfo.phone"
        />
      </view>
    </view>
    <view class="row">
      <view class="left">身份证号</view>
      <view class="right">
        <input
          class="input-dom"
          placeholder="请输入身份证号"
          type="text"
          v-model="userInfo.idCard"
        />
      </view>
    </view>
    <view class="row">
      <view class="left">联系地址</view>
      <view class="right">
        <u-input
          v-model="userInfo.address"
          placeholder="请输入联系地址"
          :custom-style="{ color: '#979797', fontSize: '28rpx' }"
          height="20"
          type="textarea"
          input-align="right"
        />
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
    <u-picker
      v-model="dateIsShow"
      mode="time"
      :default-time="birthday"
      confirm-color="#0F965B"
      @confirm="confirmDate"
    ></u-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      userInfo: {
        name: 'rocyuan',
        phone: '17788889999',
        idCard: '610125199303098865',
        address: '陕西省西安市唐延南路88号',
      },
      sexIsShow: false,
      sexIndex: 0,
      sexList: ['男', '女'],
      dateIsShow: false,
      birthday: '1996-07-04',
    }
  },
  computed: {
    sexType() {
      return this.sexList[this.sexIndex]
    },
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
      })
    },
    confirmSex(e) {
      this.sexIndex = e[0]
    },
    confirmDate(e) {
      this.birthday = `${e.year}-${e.month}-${e.day}`
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
