<template>
  <div class="col-full push-top">
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
    <thread-list :threads="threads" />
  </div>
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'

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

    const forum = computed(() =>
      store.state.forums.forums.find((forum) => forum.id === id.value)
    )

    const threads = computed(() =>
      store.state.threads.threads.filter(
        (thread) => thread.forumId === id.value
      )
    )

    return { forum, threads }
  },
}
</script>
