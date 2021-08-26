import sourceData from '@/data'

export default {
  namespaced: true,
  state: {
    users: sourceData.users,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  mutations: {
    SET_USER(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId)
      state.users[userIndex] = user
    },
    APPEND_THREAD_TO_USER(state, { userId, threadId }) {
      const user = state.users.find((user) => user.id === userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    },
  },
  actions: {
    updateUser({ commit }, user) {
      commit('SET_USER', { user, userId: user.id })
    },
  },
  getters: {
    authUser: (state, getters, rootState) => {
      const user = state.users.find((user) => user.id === state.authId)

      if (!user) return null

      return {
        ...user,
        // The get keyword allow us to access the property like
        // user.posts || user.postsCount
        get posts() {
          return rootState.posts.posts.filter((post) => post.userId === user.id)
        },
        get postsCount() {
          return this.posts.length
        },
        get threads() {
          return rootState.threads.threads.filter(
            (thread) => thread.userId === user.id
          )
        },
        get threadsCount() {
          return this.threads.length
        },
      }
    },
  },
}
