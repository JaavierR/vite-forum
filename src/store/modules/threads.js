import firebase from 'firebase/app'
import { findById, makeAppendChildToParentMutation, upsert } from '@/helpers'

export default {
  namespaced: true,
  state: {
    threads: [],
  },
  mutations: {
    APPEND_POST_TO_THREAD: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'posts',
    }),
    SET_THREAD(state, { thread }) {
      upsert(state.threads, thread)
    },
    APPEND_CONTRIBUTOR_TO_THREAD: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'contributors',
    }),
  },
  actions: {
    async createThread(
      { state, commit, rootState, dispatch },
      { title, text, forumId }
    ) {
      const id = 'gggg' + Math.random()
      const userId = rootState.auth.authId
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
    fetchThread({ commit }, { id }) {
      console.log('🔥📄', id)
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('threads')
          .doc(id)
          .onSnapshot((doc) => {
            const thread = { ...doc.data(), id: doc.id }
            commit('SET_THREAD', { thread })
            resolve(thread)
          })
      })
    },
  },
  getters: {
    thread: (state, _, rootState) => {
      return (id) => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          // * We don't allways need the properties author,... on the returned
          // * thread, so they are created using native js getters.
          // * This way, the computation only happens when we access the prop.
          get author() {
            return findById(rootState.users.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors?.length || 1
          },
        }
      }
    },
  },
}
