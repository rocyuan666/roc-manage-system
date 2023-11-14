<template>
  <div>
    <iFrame v-model:src="url"></iFrame>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import iFrame from '@/components/iFrame'

const url = ref(import.meta.env.VITE_APP_BASE_API + '/druid/login.html')
</script>
