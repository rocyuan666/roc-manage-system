<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'RocGit',
  data() {
    return {
      url: 'https://gitee.com/rocyuan666/roc-manage-system'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
