<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link
              :to="{ name: 'ThreadShow', params: { id: thread.id } }"
            >
              {{ thread.title }}
            </router-link>
          </p>

          <p>
            By <a href="#">{{ userById(thread.userId).name }}</a
            >, {{ thread.publishedAt }}.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }}</p>

          <img
            class="avatar-medium"
            :src="userById(thread.userId).avatar"
            alt=""
          />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button class="btn-circle" disabled="">
        <i class="fa fa-angle-left"></i>
      </button>
      1 of 3
      <button class="btn-circle">
        <i class="fa fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { posts, users } = sourceData

    const postById = (postId) => {
      return posts.find((p) => p.id === postId)
    }

    const userById = (userId) => {
      return users.find((u) => u.id === userId)
    }

    return {
      postById,
      userById,
    }
  },
}
</script>
