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
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'
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

    const fetchForum = async (id) => {
      const forum = await store.dispatch('forums/fetchForum', { id })
      const threads = await store.dispatch('threads/fetchThreads', {
        ids: forum.threads,
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
      return forum.value.threads.map((threadId) =>
        store.getters['threads/thread'](threadId)
      )
    })

    return { ready, forum, threads }
  },
}
</script>
