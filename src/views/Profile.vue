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
    const { ready, fetched } = useDataStatus()
    // onBeforeRouteEnter not exists, one implementation is directly in the
    // router file, or maybe check inside the setup method.
    const fetchAuthUserPosts = async () => {
      await store.dispatch('auth/fetchAuthUserPosts')
      fetched()
    }

    fetchAuthUserPosts()

    return {
      ready,
      user,
    }
  },
}
</script>
