<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <user-profile-card :user="user" />
      <user-profile-card-editor :user="user" />

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

      <post-list :posts="user.posts" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import PostList from '@/components/PostList.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue'

export default {
  components: { PostList, UserProfileCard, UserProfileCardEditor },
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['users/authUser'])

    return {
      user,
    }
  },
}
</script>
