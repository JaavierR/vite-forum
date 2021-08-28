import sourceData from '@/data'
import { makeAppendChildToParentMutation } from '@/helpers'

export default {
  namespaced: true,
  state: {
    forums: sourceData.forums,
  },
  mutations: {
    APPEND_THREAD_TO_FORUM: makeAppendChildToParentMutation({
      parent: 'forums',
      child: 'threads',
    }),
  },
  actions: {},
  getters: {},
}
