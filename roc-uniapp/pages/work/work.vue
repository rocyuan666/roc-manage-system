<template>
  <view class="work-container"><roc-navbar title="工作台"></roc-navbar></view>
</template>

<script>
import { tokenKey } from '@/common/config.js'

export default {
  data() {
    return {}
  },
  onShow() {
    if (!this.$roc.getStorage(tokenKey)) this.$roc.route('/pages/login/login')
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
