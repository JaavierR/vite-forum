import firebase from 'firebase/app'
import chunk from 'lodash/chunk'
import {
  docToResource,
  findById,
  makeAppendChildToParentMutation,
} from '@/helpers'

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
    APPEND_CONTRIBUTOR_TO_THREAD: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'contributors',
    }),
    CLEAR_THREADS(state) {
      state.threads = []
    },
  },
  actions: {
    async createThread(
      { state, commit, rootState, dispatch },
      { title, text, forumId }
    ) {
      const userId = rootState.auth.authId
      const publishedAt = firebase.firestore.FieldValue.serverTimestamp()
      const threadRef = firebase.firestore().collection('threads').doc()
      const thread = { forumId, title, publishedAt, userId, id: threadRef.id }
      // Firebase
      const userRef = firebase.firestore().collection('users').doc(userId)
      const forumRef = firebase.firestore().collection('forums').doc(forumId)
      const batch = firebase.firestore().batch()
      // Write to firestore
      batch.set(threadRef, thread)
      batch.update(userRef, {
        threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
      })
      batch.update(forumRef, {
        threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
      })
      await batch.commit()
      // Retrieve the created thread
      const newThread = await threadRef.get()
      // Set thread in vuex
      commit(
        'SET_ITEM',
        { resource: 'threads', item: newThread },
        { root: true }
      )
      commit(
        'users/APPEND_THREAD_TO_USER',
        { parentId: userId, childId: threadRef.id },
        { root: true }
      )
      commit(
        'forums/APPEND_THREAD_TO_FORUM',
        { parentId: forumId, childId: threadRef.id },
        { root: true }
      )
      // We await the post creation because it's doing async actions.
      await dispatch(
        'posts/createPost',
        { text, threadId: threadRef.id },
        { root: true }
      )

      return findById(state.threads, threadRef.id)
    },
    async updateThread({ commit, state, rootState }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(rootState.posts.posts, thread.posts[0])
      let newThread = { ...thread, title }
      let newPost = { ...post, text }
      // Firebase
      const threadRef = firebase.firestore().collection('threads').doc(id)
      const postRef = firebase.firestore().collection('posts').doc(post.id)
      const batch = firebase.firestore().batch()
      // Write to the db
      batch.update(threadRef, newThread)
      batch.update(postRef, newPost)
      await batch.commit()
      // Fetch the current update data
      newThread = await threadRef.get()
      newPost = await postRef.get()
      // Set data to vuex
      commit(
        'SET_ITEM',
        { resource: 'threads', item: newThread },
        { root: true }
      )
      commit('SET_ITEM', { resource: 'posts', item: newPost }, { root: true })
      return docToResource(newThread)
    },
    // * dispatch by default return a Promise so there are no need to wrap
    // * dispatch in a Promise.
    fetchThread: ({ dispatch }, { id }) =>
      dispatch(
        'fetchItem',
        { resource: 'threads', id, emoji: '📄' },
        { root: true }
      ),
    fetchThreads: ({ dispatch }, { ids }) =>
      dispatch(
        'fetchItems',
        {
          ids,
          emoji: '📄',
          resource: 'threads',
        },
        { root: true }
      ),
    fetchThreadsByPage: ({ commit, dispatch }, { ids, page, perPage = 10 }) => {
      commit('CLEAR_THREADS')
      const chunks = chunk(ids, perPage)
      const limitedIds = chunks[page - 1]
      return dispatch('fetchThreads', { ids: limitedIds })
    },
  },
  getters: {
    thread: (state, _, rootState) => {
      return (id) => {
        const thread = findById(state.threads, id)
        if (!thread) return {}
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
