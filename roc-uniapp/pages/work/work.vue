<template>
  <view class="work-container">
    <roc-navbar title="工作台"></roc-navbar>
    <roc-menu :list="menus"></roc-menu>
  </view>
</template>

<script>
import { tokenKey } from '@/common/config.js'
import { getRouters } from '@/api/menu.js'

export default {
  data() {
    return {
      menus: [],
    }
  },
  onShow() {
    if (!this.$u.getStorage(tokenKey)) this.$u.route('/pages/login/login')
    this.getRouters()
  },
  methods: {
    async getRouters() {
      const { data } = await getRouters()
      this.menus = data
    },
  },
}
</script>

<style lang="scss" scoped></style>
