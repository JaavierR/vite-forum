<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <div class="profile-card">
        <p class="text-center">
          <img
            :src="user.avatar"
            :alt="`${user.name} profile picture`"
            class="mx-auto avatar-xlarge"
          />
        </p>

        <h1 class="title">{{ user.username }}</h1>

        <p class="text-lead">{{ user.name }}</p>

        <p class="text-justify">{{ user.bio || 'No Bio Specified.' }}</p>

        <span class="online">{{ user.username }} is online</span>

        <div class="stats">
          <span>{{ userPostsCount }} posts</span>
          <span>{{ userThreadsCount }} threads</span>
        </div>

        <hr />

        <p v-if="user.website" class="text-center text-large">
          <i class="fa fa-globe">
            <a :href="user.website" target="_blank" rel="noopener noreferrer">
              {{ user.website }}
            </a>
          </i>
        </p>
      </div>

      <p class="text-center text-xsmall text-faded">
        Member since june 2003, last visited 4 hours ago.
      </p>

      <div class="text-center">
        <hr />
        <a href="#" class="btn-green btn-small">Edit Profile</a>
      </div>
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> Joker's recent activity </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />

      <post-list :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import PostList from '@/components/PostList.vue'

export default {
  components: { PostList },
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['users/authUser'])

    const userPosts = computed(() =>
      store.state.posts.posts.filter((post) => post.userId === user.value.id)
    )
    const userPostsCount = computed(() => userPosts.value.length)

    const userThreads = computed(() =>
      store.state.threads.threads.filter(
        (thread) => thread.userId === user.value.id
      )
    )
    const userThreadsCount = computed(() => userThreads.value.length)

    return {
      user,
      userPosts,
      userPostsCount,
      userThreadsCount,
    }
  },
}
</script>
