<template>
  <view class="index-container">
    <uni-nav-bar
      :fixed="true"
      :shadow="true"
      :color="navbar.textColor"
      :backgroundColor="navbar.bgColor"
      :statusBar="true"
      title="首页"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {
    // 工具集
    console.log(this.$roc)
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
