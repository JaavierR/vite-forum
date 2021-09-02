export default {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {},
  actions: {
    createPost({ commit, rootState }, post) {
      post.id = 'gggg' + Math.random()
      post.userId = rootState.auth.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('SET_ITEM', { resource: 'posts', item: post }, { root: true })
      commit(
        'threads/APPEND_POST_TO_THREAD',
        {
          parentId: post.threadId,
          childId: post.id,
        },
        { root: true }
      )
      commit(
        'threads/APPEND_CONTRIBUTOR_TO_THREAD',
        { parentId: post.threadId, childId: post.userId },
        { root: true }
      )
    },
    fetchPost({ dispatch }, { id }) {
      return dispatch(
        'fetchItem',
        { resource: 'posts', id, emoji: '💬' },
        { root: true }
      )
    },
    fetchPosts({ dispatch }, { ids }) {
      return dispatch(
        'fetchItems',
        {
          ids,
          emoji: '💬',
          resource: 'posts',
        },
        { root: true }
      )
    },
  },
  getters: {},
}
