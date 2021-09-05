<template>
  <div v-if="ready" class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
      @clean="formIsDirty = false"
      @dirty="formIsDirty = true"
    />
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import useDataStatus from '@/composables/useDataStatus'
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
    const formIsDirty = ref(false)
    const { ready, fetched } = useDataStatus()

    const fetchThread = async (id) => {
      const thread = await store.dispatch('threads/fetchThread', { id })
      await store.dispatch('posts/fetchPost', { id: thread.posts[0] })
      fetched()
    }

    fetchThread(id.value)

    const thread = computed(() =>
      findById(store.state.threads.threads, id.value)
    )

    const text = computed(() => {
      const post = findById(store.state.posts.posts, thread.value.posts[0])
      return post ? post.text : ''
    })

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

    onBeforeRouteLeave(() => {
      if (formIsDirty.value) {
        const confirmed = window.confirm(
          'Are you sure you want to leave? Unsaved changes will be lost!'
        )
        if (!confirmed) return false
      }
    })

    return {
      formIsDirty,
      ready,
      thread,
      text,

      save,
      cancel,
    }
  },
}
</script>
