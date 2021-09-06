<template>
  <div v-if="ready" class="container">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <RouterLink
          :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
          class="btn-green btn-small"
          >Start a Thread</RouterLink
        >
      </div>
    </div>
    <div class="col-full push-top">
      <ThreadList v-if="threads.length" :threads="threads" />
      <VPagination v-model="page" :pages="totalPages" active-color="#57AD8D" />
    </div>
  </div>
</template>

<script>
import { computed, ref, toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import useDataStatus from '@/composables/useDataStatus'
import { findById } from '@/helpers'

import ThreadList from '@/components/ThreadList.vue'

export default {
  components: { ThreadList },
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
    const page = ref(1)
    const perPage = ref(10)

    const fetchForum = async (id) => {
      const forum = await store.dispatch('forums/fetchForum', { id })
      const threads = await store.dispatch('threads/fetchThreadsByPage', {
        ids: forum.threads,
        page: page.value,
        perPage: perPage.value,
      })

      await store.dispatch('users/fetchUsers', {
        ids: threads.map((thread) => thread.userId),
      })

      fetched()
    }

    fetchForum(id.value)

    const forum = computed(() => findById(store.state.forums.forums, id.value))
    const threads = computed(() => {
      if (!forum.value) return []
      return store.state.threads.threads
        .filter((thread) => thread.forumId === forum.value.id)
        .map((thread) => store.getters['threads/thread'](thread.id))
    })

    const threadCount = computed(() => forum.value.threads.length)

    const totalPages = computed(() => {
      if (!threadCount.value) return 0
      return Math.ceil(threadCount.value / perPage.value)
    })

    watch(page, async (page) => {
      const threads = await store.dispatch('threads/fetchThreadsByPage', {
        ids: forum.value.threads,
        page: page,
        perPage: perPage.value,
      })

      await store.dispatch('users/fetchUsers', {
        ids: threads.map((thread) => thread.userId),
      })
    })

    return { page, totalPages, ready, forum, threads }
  },
}
</script>
