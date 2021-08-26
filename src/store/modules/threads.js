import sourceData from '@/data'

export default {
  namespaced: true,
  state: {
    threads: sourceData.threads,
  },
  mutations: {
    APPEND_POST_TO_THREAD(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    SET_THREAD(state, { thread }) {
      state.threads.push(thread)
    },
  },
  actions: {
    async createThread(
      { state, commit, rootState, dispatch },
      { title, text, forumId }
    ) {
      const id = 'gggg' + Math.random()
      const userId = rootState.users.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = { forumId, title, publishedAt, userId, id }
      commit('SET_THREAD', { thread })
      commit(
        'users/APPEND_THREAD_TO_USER',
        { userId, threadId: id },
        { root: true }
      )
      commit(
        'forums/APPEND_THREAD_TO_FORUM',
        { forumId, threadId: id },
        { root: true }
      )
      dispatch('posts/createPost', { text, threadId: id }, { root: true })

      return state.threads.find((thread) => thread.id === id)
    },
  },
  getters: {},
}
