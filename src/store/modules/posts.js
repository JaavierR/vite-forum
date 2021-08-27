import sourceData from '@/data'

export default {
  namespaced: true,
  state: {
    posts: sourceData.posts,
  },
  mutations: {
    SET_POST(state, { post }) {
      const index = state.posts.findIndex((p) => p.id === post.id)
      if (post.id && index !== -1) {
        state.posts[index] = post
      } else {
        state.posts.push(post)
      }
    },
  },
  actions: {
    createPost({ commit, rootState }, post) {
      post.id = 'gggg' + Math.random()
      post.userId = rootState.users.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

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
