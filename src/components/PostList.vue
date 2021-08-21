<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="user-info">
        <a href="#" class="user-name">
          {{ userById(post.userId).name }}
        </a>

        <a href="#">
          <img
            :src="userById(post.userId).avatar"
            alt=""
            class="avatar-large"
          />
        </a>

        <p class="desktop-only text-small">107 posts</p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>

      <div class="post-date text-faded">
        {{ post.publishedAt }}
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { users } = sourceData

    const userById = (userId) => {
      return users.find((u) => u.id === userId)
    }

    return { userById }
  },
}
</script>
