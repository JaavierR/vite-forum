<template>
  <div v-if="ready" class="container">
    <h1 class="mt-10 mb-6 text-3xl font-medium">Welcome to the forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import useDataStatus from '@/composables/useDataStatus'
import CategoryList from '@/components/CategoryList.vue'

export default {
  components: {
    CategoryList,
  },
  setup() {
    const store = useStore()
    const { ready, fetched } = useDataStatus()
    const fetchAllCategories = async () => {
      const categories = await store.dispatch('categories/fetchAllCategories')
      const forumIds = categories.map((category) => category.forums).flat()
      await store.dispatch('forums/fetchForums', { ids: forumIds })
      fetched()
    }

    fetchAllCategories()

    const categories = computed(() => store.state.categories.categories)

    return {
      ready,
      categories,
    }
  },
}
</script>
