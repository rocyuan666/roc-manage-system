<template>
  <view class="work-container">
    <roc-navbar title="工作台"></roc-navbar>
    <view v-for="menu in menus" :key="menu.id">
      <view>{{ menu.meta.title }}</view>
    </view>
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
  onLoad() {
    this.getRouters()
  },
  onShow() {
    if (!this.$u.getStorage(tokenKey)) this.$u.route('/pages/login/login')
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
