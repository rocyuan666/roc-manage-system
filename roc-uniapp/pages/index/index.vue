<template>
  <view class="index-container">
    <roc-navbar title="首页"></roc-navbar>
    <view>首页</view>
  </view>
</template>

<script>
import { tokenKey } from '@/common/config.js'

export default {
  data() {
    return {}
  },
  onShow() {
    if (!this.$u.getStorage(tokenKey)) this.$u.route('/pages/login/login')
    // 工具集
    // console.log(this.$u)
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
