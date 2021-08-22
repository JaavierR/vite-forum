<template>
  <div class="col-large push-top">
    <h1 class="my-4 text-3xl font-medium">{{ thread.title }}</h1>
    <post-list :posts="threadPosts" />
    <post-editor @save="addPost" />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'

export default {
  components: {
    PostList,
    PostEditor,
  },
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const store = useStore()
    const { id } = toRefs(props)
    const threads = computed(() => store.state.threads.threads)
    const posts = computed(() => store.state.posts.posts)

    const thread = computed(
      () => threads.value.find((thread) => thread.id === id.value) // Also available under route.params.id
    )

    const threadPosts = computed(() =>
      posts.value.filter((post) => post.threadId === id.value)
    )

    const postById = (postId) => {
      return posts.value.find((p) => p.id === postId)
    }

    const addPost = (eventData) => {
      const post = {
        ...eventData.post,
        threadId: id.value,
      }
      posts.value.push(post)
      thread.value.posts.push(post.id)
    }

    return {
      // Computed
      thread,
      threadPosts,

      // Methods
      postById,
      addPost,
    }
  },
}
</script>
