import firebase from 'firebase'
import { findById, makeAppendChildToParentMutation, upsert } from '@/helpers'

export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    SET_USER(state, { user }) {
      upsert(state.users, user)
    },
    APPEND_THREAD_TO_USER: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'threads',
    }),
  },
  actions: {
    updateUser({ commit }, user) {
      commit('SET_USER', { user })
    },
    fetchUser({ commit }, { id }) {
      console.log('🔥🙋🏽‍♂️', id)
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('users')
          .doc(id)
          .onSnapshot((doc) => {
            const user = { ...doc.data(), id: doc.id }
            commit('SET_USER', { user })
            resolve(user)
          })
      })
    },
  },
  getters: {
    user: (state, _, rootState) => {
      return (id) => {
        const user = findById(state.users, id)

        if (!user) return null

        return {
          ...user,
          // The get keyword allow us to access the property like
          // user.posts || user.postsCount
          get posts() {
            return rootState.posts.posts.filter(
              (post) => post.userId === user.id
            )
          },
          get postsCount() {
            return this.posts.length
          },
          get threads() {
            return rootState.threads.threads.filter(
              (thread) => thread.userId === user.id
            )
          },
          get threadsCount() {
            return this.threads.length
          },
        }
      }
    },
  },
}
