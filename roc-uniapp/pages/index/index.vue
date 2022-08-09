<template>
  <view class="index-container">首页</view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {
    this.getBannerImg();
  },
  methods: {
    async getBannerImg() {
      const res = await this.$api.getBannerData();
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped></style>
