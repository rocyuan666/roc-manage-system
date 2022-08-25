<template>
  <view class="my-container">
    <roc-navbar title="我的"></roc-navbar>
    <view class="my-info-box">
      <view class="header-img-box">
        <image
          :src="user.avatar == '' ? '../../static/images/top_user_img.jpg' : user.avatar"
          mode="widthFix"
        ></image>
      </view>
      <view class="info-box">
        <view class="username">{{ user.nickName }}</view>
        <view class="sysid">账号：{{ user.userName }}</view>
      </view>
      <view class="btn-my-info" @click="toPageProfile">个人信息</view>
    </view>
    <view class="profile-main">
      <view class="list-box">
        <view class="row" @click="toPageProfileEdit">
          <image class="icon-img" src="../../static/images/edit.png" mode=""></image>
          <view class="name">编辑信息</view>
          <view class="right">
            <image class="icon-more" src="../../static/images/arrow.svg" mode=""></image>
          </view>
        </view>
        <view class="row" @click="clernCache">
          <image class="icon-img" src="../../static/images/qchc.png" mode=""></image>
          <view class="name">清除缓存</view>
          <view class="right">
            <view class="text">{{ cacheSizeString }}</view>
            <image class="icon-more" src="../../static/images/arrow.svg" mode=""></image>
          </view>
        </view>
        <view class="row" @click="handleExit">
          <image class="icon-img" src="../../static/images/exit.png" mode=""></image>
          <view class="name">退出</view>
          <view class="right">
            <image class="icon-more" src="../../static/images/arrow.svg" mode=""></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { tokenKey } from '@/common/config.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 缓存文件大小
      cacheSizeString: '',
    }
  },
  onLoad() {
    this.formatSize()
  },
  onShow() {
    if (!this.$u.getStorage(tokenKey)) this.$u.route('/pages/login/login')
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  methods: {
    toPageProfile() {
      this.$u.route('/pages/my/profile')
    },
    toPageProfileEdit() {
      this.$u.route('/pages/my/profileEdit')
    },
    handleExit() {
      const that = this
      uni.showModal({
        title: '退出',
        content: '你确定要退出账号吗？',
        success: function(res) {
          if (res.confirm) {
            that.$store.dispatch('LogOut').then(() => {
              that.$u.route('/pages/login/login')
            })
          }
        },
      })
    },
    // 获取缓存
    formatSize() {
      let that = this
      // #ifdef APP-PLUS
      plus.cache.calculate(function(size) {
        let sizeCache = parseInt(size)
        if (sizeCache == 0) {
          that.fileSizeString = '0B'
        } else if (sizeCache < 1024) {
          that.fileSizeString = sizeCache + 'B'
        } else if (sizeCache < 1048576) {
          that.fileSizeString = (sizeCache / 1024).toFixed(2) + 'KB'
        } else if (sizeCache < 1073741824) {
          that.fileSizeString = (sizeCache / 1048576).toFixed(2) + 'MB'
        } else {
          that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + 'GB'
        }
      })
      // #endif
    },
    // 清除缓存
    clernCache() {
      let that = this
      // #ifdef APP-PLUS
      uni.showModal({
        title: '清除缓存',
        content: '您确定要清除缓存吗？',
        success: function(res) {
          if (res.confirm) {
            that.clearCache()
          } else if (res.cancel) {
          }
        },
      })
      // #endif
    },
    // 清理缓存
    clearCache() {
      let that = this
      uni.showLoading({
        mask: true,
        title: '清除中...',
      })
      // #ifdef APP-PLUS
      let os = plus.os.name
      if (os == 'Android') {
        let main = plus.android.runtimeMainActivity()
        let sdRoot = main.getCacheDir()
        let files = plus.android.invoke(sdRoot, 'listFiles')
        let len = files.length
        for (let i = 0; i < len; i++) {
          let filePath = '' + files[i] // 没有找到合适的方法获取路径，这样写可以转成文件路径
          plus.io.resolveLocalFileSystemURL(
            filePath,
            function(entry) {
              if (entry.isDirectory) {
                entry.removeRecursively(
                  function(entry) {
                    //递归删除其下的所有文件及子目录
                    uni.hideLoading()
                    uni.showToast({
                      title: '缓存清理完成',
                      duration: 2000,
                    })
                    that.formatSize() // 重新计算缓存
                  },
                  function(e) {
                    console.log(e.message)
                  }
                )
              } else {
                entry.remove()
              }
            },
            function(e) {
              console.log('文件路径读取失败')
            }
          )
        }
      } else {
        // ios
        plus.cache.clear(function() {
          uni.showToast({
            title: '缓存清理完成',
            duration: 2000,
          })
          that.formatSize()
        })
      }
      // #endif
    },
  },
}
</script>

<style lang="scss" scoped>
page {
  .my-container {
    .status_bar {
      background-color: $uni-color-primary;
    }
    .my-info-box {
      height: 192rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 38rpx;
      background-color: $uni-color-primary;
      .header-img-box {
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        overflow: hidden;
        margin-right: 20rpx;
        image {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .info-box {
        width: 320rpx;
        .username {
          font-size: 36rpx;
          color: #fff;
          margin-bottom: 8rpx;
        }
        .sysid {
          font-size: 28rpx;
          color: #fff;
          opacity: 0.6;
        }
      }
      .btn-my-info {
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 30rpx;
        padding: 0 40rpx;
        margin-left: auto;
        font-size: 28rpx;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
    .profile-main {
      padding: 36rpx 24rpx;
      .list-box {
        background-color: #fff;
        border-radius: 16rpx;
        .row {
          display: flex;
          align-items: center;
          border: 1px solid #fafafa;
          .icon-img {
            display: block;
            width: 60rpx;
            height: 60rpx;
            margin: 32rpx;
          }
          .name {
            font-size: 32rpx;
            color: #101010;
          }
          .right {
            margin-left: auto;
            display: flex;
            align-items: center;
            .text {
              font-size: 28rpx;
              color: #949596;
              margin-right: 8rpx;
            }
            .dot {
              width: 16rpx;
              height: 16rpx;
              border-radius: 8rpx;
              background-color: #ff5353;
              margin-right: 8rpx;
            }
            .icon-more {
              display: block;
              width: 40rpx;
              height: 40rpx;
            }
          }
        }
      }
    }
  }
}
</style>
