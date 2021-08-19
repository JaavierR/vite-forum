<template>
  <div>Hello from page home component.</div>
  <div v-for="thread in threads" :key="thread.id">
    <h2>{{ thread.title }}</h2>
    <div v-for="postId in thread.posts" :key="postId">
      <p>{{ userById(postById(postId).userId).name }}</p>
      <p>{{ postById(postId).text }}</p>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
export default {
  setup() {
    const { threads, posts, users } = sourceData

    const postById = (postId) => {
      return posts.find((p) => p.id === postId)
    }

    const userById = (userId) => {
      return users.find((u) => u.id === userId)
    }

    return {
      threads,

      postById,
      userById,
    }
  },
}
</script>
