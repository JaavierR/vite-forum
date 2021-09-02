<template>
  <h1 class="mt-10 mb-6 text-3xl font-medium">Welcome to the forum</h1>
  <category-list :categories="categories" />
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import CategoryList from '@/components/CategoryList.vue'

export default {
  components: {
    CategoryList,
  },
  setup() {
    const store = useStore()
    const fetchAllCategories = async () => {
      const categories = await store.dispatch('categories/fetchAllCategories')
      const forumIds = categories.map((category) => category.forums).flat()
      store.dispatch('forums/fetchForums', { ids: forumIds })
    }

    fetchAllCategories()

    const categories = computed(() => store.state.categories.categories)

    return {
      categories,
    }
  },
}
</script>
