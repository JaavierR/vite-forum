<template>
  <div v-if="ready" class="col-large push-top">
    <h1 class="my-4 text-3xl font-medium">
      {{ thread.title }}
      <RouterLink
        v-if="thread.userId === authUser?.id"
        :to="{ name: 'ThreadEdit', id }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </RouterLink>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a
      >, <AppDate :timestamp="thread.publishedAt" />.
      <span class="mt-[2px] hide-mobile text-faded text-small float-right"
        >{{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors</span
      >
    </p>

    <PostList :posts="threadPosts" />
    <PostEditor v-if="authUser" @save="addPost" />
    <div v-else class="text-center" style="margin-bottom: 50px">
      <RouterLink :to="{ name: 'Login', query: { redirectTo: $route.path } }">
        Sign In
      </RouterLink>
      or
      <RouterLink
        :to="{ name: 'Register', query: { redirectTo: $route.path } }"
      >
        Register
      </RouterLink>
      to reply.
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import difference from 'lodash/difference'

import useDataStatus from '@/composables/useDataStatus'
import useNotifications from '@/composables/useNotifications'

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
    const { addNotification } = useNotifications()
    const { ready, fetched } = useDataStatus()

    const authUser = computed(() => store.getters['auth/authUser'])

    const fetchPostsWithUsers = async (ids) => {
      // fetch the posts
      const posts = await store.dispatch('posts/fetchPosts', {
        ids,
        onSnapshot: ({ isLocal, previousItem }) => {
          if (
            !ready.value ||
            isLocal ||
            (previousItem?.edited && !previousItem?.edited?.at)
          )
            return
          addNotification({ message: 'Thread recently updated', timeout: 5000 })
        },
      })

      // fetch the users associated with the posts
      const users = posts.map((post) => post.userId).concat(thread.value.userId)
      await store.dispatch('users/fetchUsers', { ids: users })
    }

    const fetchThread = async (id) => {
      // fetch the thread
      const thread = await store.dispatch('threads/fetchThread', {
        id,
        onSnapshot: async ({ isLocal, item, previousItem }) => {
          if (!ready.value || isLocal) return
          const newPosts = difference(item.posts, previousItem.posts)
          const hasNewPosts = newPosts.length > 0
          if (hasNewPosts) {
            await fetchPostsWithUsers(newPosts)
          } else {
            addNotification({
              message: 'Thread recently updated',
              timeout: 5000,
            })
          }
        },
      })
      await fetchPostsWithUsers(thread.posts)
      fetched()
    }

    fetchThread(id.value)

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
      ready,
      // Computed
      authUser,
      thread,
      threadPosts,

      // Methods
      addPost,
    }
  },
}
</script>
