<template>
  <h1 class="my-4 text-3xl font-medium">Welcome to the forum</h1>
  <category-list :categories="categories" />
</template>

<script>
import sourceData from '@/data.json'

import CategoryList from '@/components/CategoryList.vue'

export default {
  components: {
    CategoryList,
  },
  setup() {
    const { categories } = sourceData

    return {
      categories,
    }
  },
}
</script>
