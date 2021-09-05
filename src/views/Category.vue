<template>
  <h1 class="text-3xl font-bold">{{ category.name }}</h1>
  <ForumList :title="category.name" :forums="getForumsForCategory(category)" />
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { findById } from '@/helpers'

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
    const store = useStore()
    const { id } = toRefs(props)

    const fecthCategory = async (id) => {
      const category = await store.dispatch('categories/fetchCategory', { id })
      store.dispatch('forums/fetchForums', { ids: category.forums })
    }

    fecthCategory(id.value)

    const category = computed(
      () => findById(store.state.categories.categories, id.value) || {}
    )

    const forums = computed(() => store.state.forums.forums)

    const getForumsForCategory = (category) =>
      forums.value.filter((forum) => forum.categoryId === category.id)

    return {
      category,
      getForumsForCategory,
    }
  },
}
</script>
