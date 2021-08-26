<template>
  <div class="col-full push-top">
    <h1>
      Create a new thread in <i>{{ forum.name }}</i>
    </h1>

    <thread-editor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

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

    const forum = computed(() =>
      store.state.forums.forums.find((forum) => forum.id === forumId.value)
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
      forum,

      save,
      cancel,
    }
  },
}
</script>
