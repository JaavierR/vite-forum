<template>
  <div>
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
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
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
      <router-link :to="{ name: 'ProfileEdit' }" class="btn-green btn-small"
        >Edit Profile</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
