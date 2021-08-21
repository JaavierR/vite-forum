<template>
  <div class="col-large push-top">
    <h1 class="my-4 text-3xl font-medium">{{ thread.title }}</h1>
    <post-list :posts="threadPosts" />
    <post-editor @save="addPost" />
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import sourceData from '@/data.json'

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
    const { id } = toRefs(props)
    const { threads, posts, users } = toRefs(reactive(sourceData))

    const thread = computed(
      () => threads.value.find((thread) => thread.id === id.value) // Also available under route.params.id
    )

    const threadPosts = computed(() =>
      posts.value.filter((post) => post.threadId === id.value)
    )

    const postById = (postId) => {
      return posts.value.find((p) => p.id === postId)
    }

    const userById = (userId) => {
      return users.value.find((u) => u.id === userId)
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
      userById,
      addPost,
    }
  },
}
</script>
