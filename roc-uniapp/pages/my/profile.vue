<template>
  <view class="profile-edit-container">
    <roc-navbar title="修改信息"></roc-navbar>
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
      <view class="right">
        <input class="input-dom" type="text" v-model="user.nickName" disabled />
      </view>
    </view>
    <view class="row" @click="sexIsShow = true">
      <view class="left">性别</view>
      <view class="right">
        <view class="text">{{ sexList[user.sex] }}</view>
      </view>
    </view>
    <view class="row">
      <view class="left">手机号码</view>
      <view class="right">
        <input class="input-dom" type="text" v-model="user.phonenumber" disabled />
      </view>
    </view>
    <view class="row">
      <view class="left">用户邮箱</view>
      <view class="right">
        <input class="input-dom" type="text" v-model="user.email" disabled />
      </view>
    </view>
    <view class="row">
      <view class="left">用户名称</view>
      <view class="right">
        <input class="input-dom" type="text" v-model="user.userName" disabled />
      </view>
    </view>
    <view class="row">
      <view class="left">所属部门</view>
      <view class="right">
        <view class="text" v-if="user.dept">{{ user.dept.deptName }} / {{ postGroup }}</view>
      </view>
    </view>
    <view class="row">
      <view class="left">所属角色</view>
      <view class="right">
        <view class="text">{{ roleGroup }}</view>
      </view>
    </view>
    <view class="row">
      <view class="left">创建日期</view>
      <view class="right">
        <view class="text">{{ user.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserProfile } from '@/api/system/user.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      sexList: ['男', '女'],
    }
  },
  onLoad() {
    this.userProfile()
  },
  computed: {
    ...mapGetters({
      user: 'user',
      postGroup: 'postGroup',
      roleGroup: 'roleGroup',
    }),
  },
}
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
  .profile-edit-container {
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
    .roc-btn {
      margin-top: 100rpx;
    }
  }
}
</style>
