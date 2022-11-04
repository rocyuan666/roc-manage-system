<template>
  <text class="roc-icon"><text :class="`roc-icon-${name}`"></text></text>
</template>

<script>
export default {
  name: 'roc-icon',
  props: {
    name: {
      type: String,
      require: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
