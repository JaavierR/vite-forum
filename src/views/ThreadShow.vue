<template>
  <div class="col-large push-top">
    <h1 class="my-4 text-3xl font-medium">
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', id }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ thread.author.name }}</a
      >, <app-date :timestamp="thread.publishedAt" />.
      <span class="mt-[2px] hide-mobile text-faded text-small float-right"
        >{{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors</span
      >
    </p>

    <post-list :posts="threadPosts" />
    <post-editor @save="addPost" />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import AppDate from '@/components/AppDate.vue'

export default {
  components: {
    PostList,
    PostEditor,
    AppDate,
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
    const posts = computed(() => store.state.posts.posts)

    const thread = computed(
      () => store.getters['threads/thread'](id.value) // Also available under route.params.id
    )

    const threadPosts = computed(() =>
      posts.value.filter((post) => post.threadId === id.value)
    )

    const addPost = (eventData) => {
      const post = {
        ...eventData.post,
        threadId: id.value,
      }
      store.dispatch('posts/createPost', post)
    }

    return {
      // Computed
      thread,
      threadPosts,

      // Methods
      addPost,
    }
  },
}
</script>
