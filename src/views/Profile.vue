<template>
  <div v-if="ready" class="flex-grid">
    <div class="col-3 push-top">
      <UserProfileCard v-if="!edit" :user="user" />
      <UserProfileCardEditor v-else :user="user" />
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> {{ user.username }} recent activity </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />

      <PostList :posts="user.posts" />
      <AppInfiniteScroll
        @load="fetchUserPosts"
        :done="user.posts.length === user.postsCount"
      />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import useDataStatus from '@/composables/useDataStatus'

import PostList from '@/components/PostList.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue'

export default {
  components: { PostList, UserProfileCard, UserProfileCardEditor },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['auth/authUser'])
    const lastPostFetched = computed(() => {
      if (user.value.posts.length === 0) return null
      return user.value.posts[user.value.posts.length - 1]
    })
    const { ready, fetched } = useDataStatus()
    // onBeforeRouteEnter not exists, one implementation is directly in the
    // router file, or maybe check inside the setup method.
    const fetchUserPosts = () => {
      return store.dispatch('auth/fetchAuthUserPosts', {
        startAfter: lastPostFetched.value,
      })
    }
    const fetchAuthUserPosts = async () => {
      await fetchUserPosts()
      fetched()
    }

    fetchAuthUserPosts()

    return {
      ready,
      user,

      fetchUserPosts,
    }
  },
}
</script>
