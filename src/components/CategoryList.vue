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
import { useStore } from 'vuex'
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
    const store = useStore()

    const getForumsForCategory = (category) =>
      store.state.forums.forums.filter(
        (forum) => forum.categoryId === category.id
      )

    return { getForumsForCategory }
  },
}
</script>
