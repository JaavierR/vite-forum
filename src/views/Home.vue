<template>
  <h1 class="my-4 text-3xl font-medium">Welcome to the forum</h1>
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
    const categories = computed(() => store.state.categories.categories)

    return {
      categories,
    }
  },
}
</script>
