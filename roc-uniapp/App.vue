<script>
export default {
  onLaunch: function() {
    // #ifdef APP-PLUS
    // 锁定竖屏
    plus.screen.lockOrientation('portrait-primary')
    // 锁定横屏
    // plus.screen.lockOrientation("landscape-primary")
    // 隐藏状态栏
    // plus.navigator.setFullscreen(true)
    // #endif
  },
  onShow: function() {},
  onHide: function() {},
}
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';
// 设置整个项目的背景色
page {
  background-color: #f5f5f5;
}
button {
  transition: all 0.3s;
  &:active {
    transform: scale(0.96);
  }
}
</style>
