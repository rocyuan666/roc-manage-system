<template>
  <view class="webview-container">
    <view class="u-loading-box"><u-loading mode="circle" size="50"></u-loading></view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      title: '',
    }
  },
  onLoad(option) {
    this.url = option.url
    this.title = option.title
    uni.setNavigationBarTitle({
      title: this.title,
    })
  },
}
</script>

<style lang="scss" scoped>
.u-loading-box {
  display: flex;
  justify-content: center;
  padding-top: 200rpx;
}
</style>
