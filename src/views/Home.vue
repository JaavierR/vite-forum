<template>
  <h1 class="my-4 text-3xl font-medium">Welcome to the forum</h1>
  <thread-list :threads="threads" />
</template>

<script>
import sourceData from '@/data.json'

import ThreadList from '@/components/ThreadList.vue'

export default {
  components: {
    ThreadList,
  },
  setup() {
    const { threads } = sourceData

    return {
      threads,
    }
  },
}
</script>
