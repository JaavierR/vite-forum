<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { findById } from '@/helpers'

import ThreadEditor from '@/components/ThreadEditor.vue'

export default {
  components: {
    ThreadEditor,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const id = ref(props.id)

    const thread = computed(() =>
      findById(store.state.threads.threads, id.value)
    )

    const text = computed(
      () => findById(store.state.posts.posts, thread.value.posts[0]).text
    )

    const save = async ({ title, text }) => {
      const thread = await store.dispatch('threads/updateThread', {
        id: id.value,
        title,
        text,
      })
      router.push({ name: 'ThreadShow', params: { id: thread.id } })
    }

    const cancel = () => {
      router.push({ name: 'ThreadShow', params: { id: id.value } })
    }

    return {
      thread,
      text,

      save,
      cancel,
    }
  },
}
</script>
