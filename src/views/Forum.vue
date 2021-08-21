<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a href="#" class="btn-green btn-small">Start a Thread</a>
    </div>
  </div>
  <div class="col-full push-top">
    <thread-list :threads="threads" />
  </div>
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'
import sourceData from '@/data.json'

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
    const { id } = toRefs(props)

    const forum = computed(() =>
      sourceData.forums.find((forum) => forum.id === id.value)
    )

    const threads = computed(() =>
      sourceData.threads.filter((thread) => thread.forumId === id.value)
    )

    return { forum, threads }
  },
}
</script>
