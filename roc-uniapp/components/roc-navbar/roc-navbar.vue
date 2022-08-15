<template>
  <uni-nav-bar
    :fixed="true"
    :shadow="false"
    :border="false"
    color="#fff"
    backgroundColor="#1890ff"
    :statusBar="true"
    :title="title"
  />
</template>

<script>
export default {
  name: 'roc-navbar',
  props: {
    title: {
      type: String,
      default: '大鹏管理系统',
    },
  },
}
</script>

<style></style>
