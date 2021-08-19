<template>
  <h1>Hola Mundo</h1>
  <div>{{ threads }}</div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  setup() {
    return {
      threads: sourceData.threads,
    }
  },
}
</script>
