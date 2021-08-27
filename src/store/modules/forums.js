import sourceData from '@/data'
import { findById } from '@/helpers'

export default {
  namespaced: true,
  state: {
    forums: sourceData.forums,
  },
  mutations: {
    APPEND_THREAD_TO_FORUM(state, { forumId, threadId }) {
      const forum = findById(state.forums, forumId)
      forum.thread = forum.thread || []
      forum.threads.push(threadId)
    },
  },
  actions: {},
  getters: {},
}
