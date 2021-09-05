<template>
  <div v-if="ready" class="container">
    <h1 class="text-3xl font-bold">{{ category.name }}</h1>
    <ForumList
      :title="category.name"
      :forums="getForumsForCategory(category)"
    />
  </div>
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import useDataStatus from '@/composables/useDataStatus'
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
    const { ready, fetched } = useDataStatus()

    const fecthCategory = async (id) => {
      const category = await store.dispatch('categories/fetchCategory', { id })
      await store.dispatch('forums/fetchForums', { ids: category.forums })
      fetched()
    }

    fecthCategory(id.value)

    const category = computed(
      () => findById(store.state.categories.categories, id.value) || {}
    )

    const forums = computed(() => store.state.forums.forums)

    const getForumsForCategory = (category) =>
      forums.value.filter((forum) => forum.categoryId === category.id)

    return {
      ready,
      category,
      getForumsForCategory,
    }
  },
}
</script>
