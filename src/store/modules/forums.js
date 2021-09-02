import { makeAppendChildToParentMutation } from '@/helpers'

export default {
  namespaced: true,
  state: {
    forums: [],
  },
  mutations: {
    APPEND_THREAD_TO_FORUM: makeAppendChildToParentMutation({
      parent: 'forums',
      child: 'threads',
    }),
  },
  actions: {
    fetchForum: ({ dispatch }, { id }) =>
      dispatch(
        'fetchItem',
        { id, emoji: '🏁', resource: 'forums' },
        { root: true }
      ),
    fetchForums: ({ dispatch }, { ids }) =>
      dispatch(
        'fetchItems',
        { ids, emoji: '🏁', resource: 'forums' },
        { root: true }
      ),
  },
  getters: {},
}
