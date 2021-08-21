<template>
  <h1 class="my-4 text-3xl font-medium">Welcome to the forum</h1>
  <forum-list :forums="forums" />
</template>

<script>
import sourceData from '@/data.json'

import ForumList from '@/components/ForumList.vue'

export default {
  components: {
    ForumList,
  },
  setup() {
    const { forums } = sourceData

    return {
      forums,
    }
  },
}
</script>
