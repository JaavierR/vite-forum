import sourceData from '@/data'
import { findById, makeAppendChildToParentMutation, upsert } from '@/helpers'

export default {
  namespaced: true,
  state: {
    threads: sourceData.threads,
  },
  mutations: {
    APPEND_POST_TO_THREAD: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'posts',
    }),
    SET_THREAD(state, { thread }) {
      upsert(state.threads, thread)
    },
  },
  actions: {
    async createThread(
      { state, commit, rootState, dispatch },
      { title, text, forumId }
    ) {
      const id = 'gggg' + Math.random()
      const userId = rootState.users.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = { forumId, title, publishedAt, userId, id }
      commit('SET_THREAD', { thread })
      commit(
        'users/APPEND_THREAD_TO_USER',
        { parentId: userId, childId: id },
        { root: true }
      )
      commit(
        'forums/APPEND_THREAD_TO_FORUM',
        { parentId: forumId, childId: id },
        { root: true }
      )
      dispatch('posts/createPost', { text, threadId: id }, { root: true })

      return findById(state.threads, id)
    },
    async updateThread({ commit, state, rootState }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(rootState.posts.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }

      commit('SET_THREAD', { thread: newThread })
      commit('posts/SET_POST', { post: newPost }, { root: true })

      return newThread
    },
  },
  getters: {},
}
