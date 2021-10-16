<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <!-- Add typeof verification 'cause on load this break the component (vue-router) if is undefined -->
            <RouterLink
              v-if="typeof thread.id !== 'undefined'"
              :to="{
                name: 'ThreadShow',
                params: { id: thread.id },
              }"
            >
              {{ thread.title }}
            </RouterLink>
          </p>

          <p>
            By <a href="#">{{ userById(thread.userId).name }}</a
            >, <AppDate :timestamp="thread.publishedAt" />.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.repliesCount }}</p>

          <AppAvatarImage
            class="avatar-medium"
            :src="userById(thread.userId).avatar"
          />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">
              <AppDate :timestamp="thread.publishedAt" />
            </p>
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
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { findById } from '@/helpers'

export default {
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    const posts = computed(() => store.state.posts.posts)
    const users = computed(() => store.state.users.users)

    const postById = (postId) => findById(posts.value, postId)

    const userById = (userId) => findById(users.value, userId) || {}

    return {
      postById,
      userById,
    }
  },
}
</script>
