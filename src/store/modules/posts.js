import sourceData from '@/data'

export default {
  namespaced: true,
  state: {
    posts: sourceData.posts,
  },
  mutations: {
    SET_POST(state, { post }) {
      state.posts.push(post)
    },
  },
  actions: {
    createPost({ commit }, post) {
      post.id = 'gggg' + Math.random()
      commit('SET_POST', { post })
      commit(
        'threads/APPEND_POST_TO_THREAD',
        {
          postId: post.id,
          threadId: post.threadId,
        },
        { root: true }
      )
    },
  },
  getters: {},
}
