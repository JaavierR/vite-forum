import sourceData from '@/data'
import { upsert } from '@/helpers'

export default {
  namespaced: true,
  state: {
    posts: sourceData.posts,
  },
  mutations: {
    SET_POST(state, { post }) {
      upsert(state.posts, post)
    },
  },
  actions: {
    createPost({ commit, rootState }, post) {
      post.id = 'gggg' + Math.random()
      post.userId = rootState.auth.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('SET_POST', { post })
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
  },
  getters: {},
}
