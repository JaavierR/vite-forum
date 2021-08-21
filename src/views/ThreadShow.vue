<template>
  <div class="col-large push-top">
    <h1 class="my-4 text-3xl font-medium">{{ thread.title }}</h1>
    <post-list :posts="threadPosts" />
    <div class="col-full">
      <form @submit.prevent="addPost">
        <div class="form-group">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="form-input"
            v-model="newPostText"
          />
          <div class="form-actions">
            <button class="btn-blue">Submit post</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs } from 'vue'
import sourceData from '@/data.json'

import PostList from '@/components/PostList.vue'

export default {
  components: {
    PostList,
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
    const newPostText = ref('')

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

    const addPost = () => {
      const postId = 'gggg' + Math.random()
      const post = {
        id: postId,
        text: newPostText.value,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: id.value,
        userId: 'HJNTR1nN8tgbB148RJrPYbby8Vl1',
      }

      posts.value.push(post)
      thread.value.posts.push(postId)

      newPostText.value = ''
    }

    return {
      newPostText,

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
