<template>
  <view v-if="navbar.isshow">
    <u-navbar
      :is-back="isBack"
      :back-icon-color="navbar.backIconColor"
      :back-icon-name="iconName"
      back-text="返回"
      :back-text-style="navbar.backTextStyle"
      :title="isShow ? title : ''"
      :title-color="navbar.titleColor"
      :title-size="navbar.titleSize"
      :background="navbar.bgColor"
      :border-bottom="borderBottom"
      :custom-back="goBack"
      :title-width="400"
      z-index="100"
    ></u-navbar>
  </view>
</template>

<script>
export default {
  name: 'yp-navbar',
  props: {
    title: {
      type: String,
      default: '大鹏管理系统',
    },
    borderBottom: {
      type: Boolean,
      default: false,
    },
    backIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageUrl: '',
      pageNum: 0,
      navbar: {
        backIconColor: '#fff',
        backTextStyle: {
          color: '#fff',
          // #ifdef MP-BAIDU
          marginLeft: '45rpx',
          marginBottom: '0rpx',
          // #endif
        },
        color: '#fff',
        bgColor: {
          background: '#1890ff',
        },
        background: '#1890ff',
        isshow: true,
        titleColor: '#fff',
        titleSize: '35',
      },
      // 不显示 返回 的页面
      tabbarPathList: [
        '/pages/index/index',
        '/pages/work/work',
        '/pages/my/my',
        '/pages/login/login',
      ],
    }
  },
  computed: {
    isBack() {
      // #ifdef MP-ALIPAY
      return false
      // #endif

      // #ifdef MP-WEIXIN || H5 || APP-PLUS || MP-BAIDU
      let status = true
      this.tabbarPathList.some(item => {
        let path = this.getPath(item)
        if (path == this.pageUrl || path == '/' + this.pageUrl) {
          status = false
          return true
        }
      })
      return status
      // #endif
    },
    iconName() {
      // #ifdef MP-BAIDU
      return ''
      // #endif
      // #ifndef MP-BAIDU
      return 'nav-back'
      // #endif
    },
    isShow() {
      // #ifdef MP-ALIPAY
      return false
      // #endif
      // #ifndef MP-ALIPAY
      return true
      // #endif
    },
  },
  created() {
    let pages = getCurrentPages()
    // 获取当前页面，页面栈中的最后一个即为项为当前页面，route属性为页面路径
    this.pageUrl = pages[pages.length - 1].route
    this.pageNum = pages.length
  },
  methods: {
    getPath(path) {
      return path ? path.split('?').shift() : path
    },
    goBack() {
      let status = false
      this.tabbarPathList.forEach(item => {
        let path = this.getPath(item)
        if (path == this.pageUrl || path == '/' + this.pageUrl) {
          status = true
        }
      })
      if (status) return
      if (this.pageNum == 1) {
        // 只有当前页面了，返回到首页
        uni.$u.route({
          url: '/pages/index/index',
        })
      } else {
        uni.$u.route({
          type: 'back',
          delta: this.backIndex,
        })
      }
    },
  },
}
</script>

<style></style>
