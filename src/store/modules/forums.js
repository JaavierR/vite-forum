import sourceData from '@/data'

export default {
  namespaced: true,
  state: {
    forums: sourceData.forums,
  },
  mutations: {
    APPEND_THREAD_TO_FORUM(state, { forumId, threadId }) {
      const forum = state.forums.find((forum) => forum.id === forumId)
      forum.thread = forum.thread || []
      forum.threads.push(threadId)
    },
  },
  actions: {},
  getters: {},
}
