<template>
  <h1>{{ category.name }}</h1>
  <forum-list :title="category.name" :forums="getForumsForCategory(category)" />
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'
import sourceData from '@/data.json'

import ForumList from '@/components/ForumList.vue'

export default {
  components: { ForumList },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { id } = toRefs(props)

    const category = computed(() =>
      sourceData.categories.find((category) => category.id === id.value)
    )

    const getForumsForCategory = (category) =>
      sourceData.forums.filter((forum) => forum.categoryId === category.id)

    return {
      category,
      getForumsForCategory,
    }
  },
}
</script>
