<template>
  <view class="roc-menu-component">
    <view v-for="menu in list" :key="menu.id">
      <view v-if="menu.children && menu.children.length">
        <roc-icon :name="menu.meta.icon"></roc-icon>
        <text>{{ menu.meta.title }}</text>
        <!-- 递归组件 -->
        <roc-menu :list="menu.children"></roc-menu>
      </view>
      <view class="menu-btn" v-else @click="handleToPage(menu)">
        <roc-icon :name="menu.meta.icon"></roc-icon>
        <text>{{ menu.meta.title }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { isExternal } from '@/utils/validate.js'
export default {
  name: 'roc-menu',
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    handleToPage(menu) {
      if (isExternal(menu.path)) {
        // 外链
        this.$u.route({
          url: 'pages/webview/webview',
          params: {
            url: menu.path,
            title: menu.meta.title,
          },
        })
      } else {
        // 页面
        this.$u.route(`/pages/${menu.path}/${menu.path}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.roc-menu-component {
  padding: 20rpx;
}
.menu-btn {
  color: $uni-color-primary;
  line-height: 1.5;
}
.roc-icon {
  padding-right: 10rpx;
}
</style>
