<template>
  <forum-list
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :title="category.name"
    :category-id="category.id"
  />
</template>

<script>
import sourceData from '@/data.json'

import ForumList from './ForumList.vue'

export default {
  components: { ForumList },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const getForumsForCategory = (category) =>
      sourceData.forums.filter((forum) => forum.categoryId === category.id)

    return { getForumsForCategory }
  },
}
</script>
