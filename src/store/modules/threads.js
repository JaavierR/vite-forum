import sourceData from '@/data'

export default {
  namespaced: true,
  state: {
    threads: sourceData.threads,
  },
  mutations: {
    APPEND_POST_TO_THREAD(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread.post = thread.post || []
      thread.posts.push(postId)
    },
    APPEND_THREAD_TO_FORUM(state, { forumId, threadId }) {
      const forum = state.forums.find((forum) => forum.id === forumId)
      forum.thread = forum.thread || []
      forum.threads.push(threadId)
    },
    APPEND_THREAD_TO_USER(state, { userId, threadId }) {
      const user = state.users.find((user) => user.id === userId)
      user.thread = user.thread || []
      user.threads.push(threadId)
    },
    SET_THREAD(state, { thread }) {
      state.threads.push(thread)
    },
  },
  actions: {
    createThread({ commit, rootState, dispatch }, { title, text, forumId }) {
      const id = 'gggg' + Math.random()
      const userId = rootState.users.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = { forumId, title, publishedAt, userId, id }
      commit('SET_THREAD', { thread })
      commit('APPEND_THREAD_TO_USER', { userId, threadId: id })
      commit('APPEND_THREAD_TO_FORUM', { forumId, threadId: id })
      dispatch('createPost', { text, threadId: id }, { root: true })
    },
  },
  getters: {},
}
