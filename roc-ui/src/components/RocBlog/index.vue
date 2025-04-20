<template>
  <div>
    <svg-icon icon-class="education" @click="goto" />
  </div>
</template>

<script setup>
const url = ref('https://rocyuan.top');

function goto() {
  window.open(url.value)
}
</script>
