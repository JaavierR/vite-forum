import firebase from 'firebase/app'
import {
  docToResource,
  findById,
  makeAppendChildToParentMutation,
  makeFetchItemAction,
  makeFetchItemsAction,
} from '@/helpers'

export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    APPEND_THREAD_TO_USER: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'threads',
    }),
  },
  actions: {
    async createUser({ commit }, { id, email, name, username, avatar = null }) {
      const registeredAt = firebase.firestore.FieldValue.serverTimestamp()
      const usernameLower = username.toLowerCase()
      email = email.toLowerCase()
      const user = {
        email,
        name,
        username,
        usernameLower,
        avatar,
        registeredAt,
      }
      // Write to firebase
      const userRef = firebase.firestore().collection('users').doc(id)
      await userRef.set(user)
      // Retrieve the generated user
      const newUser = await userRef.get()
      commit('SET_ITEM', { resource: 'users', item: newUser }, { root: true })
      return docToResource(newUser)
    },
    async updateUser({ commit }, user) {
      const updates = {
        avatar: user.avatar || null,
        username: user.username || null,
        name: user.name || null,
        bio: user.bio || null,
        website: user.website || null,
        email: user.email || null,
        location: user.location || null,
      }

      const userRef = firebase.firestore().collection('users').doc(user.id)
      await userRef.update(updates)
      commit('SET_ITEM', { resource: 'users', item: user }, { root: true })
    },
    fetchUser: makeFetchItemAction({ resource: 'users', emoji: '🙋🏽‍♂️' }),
    fetchUsers: makeFetchItemsAction({ resource: 'users', emoji: '🙋🏽‍♂️' }),
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
            return user.postsCount || 0
          },
          get threads() {
            return rootState.threads.threads.filter(
              (thread) => thread.userId === user.id
            )
          },
          get threadsCount() {
            return user.threads?.length || 0
          },
        }
      }
    },
  },
}
