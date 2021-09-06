import {
  makeAppendChildToParentMutation,
  makeFetchItemAction,
  makeFetchItemsAction,
} from '@/helpers'

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
    fetchForum: makeFetchItemAction({ resource: 'forums', emoji: '🏁' }),
    fetchForums: makeFetchItemsAction({ resource: 'forums', emoji: '🏁' }),
  },
  getters: {},
}
