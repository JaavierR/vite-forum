<template>
  <div v-if="ready" class="col-full push-top">
    <h1>
      Create a new thread in <i>{{ forum.name }}</i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import useDataStatus from '@/composables/useDataStatus'
import { findById } from '@/helpers'

import ThreadEditor from '@/components/ThreadEditor.vue'

export default {
  components: {
    ThreadEditor,
  },
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const forumId = ref(props.forumId)
    const { ready, fetched } = useDataStatus()

    const fecthForum = async () => {
      await store.dispatch('forums/fetchForum', { id: forumId.value })
      fetched()
    }

    fecthForum()

    const forum = computed(() =>
      findById(store.state.forums.forums, forumId.value)
    )

    const save = async ({ title, text }) => {
      const thread = await store.dispatch('threads/createThread', {
        forumId: forumId.value,
        title,
        text,
      })
      router.push({ name: 'ThreadShow', params: { id: thread.id } })
    }

    const cancel = () => {
      router.push({ name: 'Forum', params: { id: forum.value.id } })
    }

    return {
      ready,
      forum,

      save,
      cancel,
    }
  },
}
</script>
