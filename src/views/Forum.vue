<template>
  <div v-if="forum" class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
        >Start a Thread</router-link
      >
    </div>
  </div>
  <div class="col-full push-top">
    <thread-list v-if="threads.length" :threads="threads" />
  </div>
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
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

    const fetchForum = async (id) => {
      const forum = await store.dispatch('forums/fetchForum', { id })
      const threads = await store.dispatch('threads/fetchThreads', {
        ids: forum.threads,
      })

      store.dispatch('users/fetchUsers', {
        ids: threads.map((thread) => thread.userId),
      })
    }

    fetchForum(id.value)

    const forum = computed(() => findById(store.state.forums.forums, id.value))

    const threads = computed(() => {
      if (!forum.value) return []
      return forum.value.threads.map((threadId) =>
        store.getters['threads/thread'](threadId)
      )
    })

    return { forum, threads }
  },
}
</script>
