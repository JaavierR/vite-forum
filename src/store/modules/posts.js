import firebase from 'firebase/app'
import { makeFetchItemAction, makeFetchItemsAction } from '@/helpers'

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {},
  actions: {
    async createPost({ commit, rootState }, post) {
      post.userId = rootState.auth.authId
      // Set timestamp from the server.
      post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
      // * batch allow us to send posts and update the threads in a single
      // * transaction. This allow us to avoid some errors if the connection is
      // * lost. lesson 66.
      // Create references to the desired collections
      const batch = firebase.firestore().batch()
      const postRef = firebase.firestore().collection('posts').doc()
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(rootState.auth.authId)
      const threadRef = firebase
        .firestore()
        .collection('threads')
        .doc(post.threadId)
      // Send the data to firebase.
      batch.set(postRef, post)
      batch.update(threadRef, {
        posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
        contributors: firebase.firestore.FieldValue.arrayUnion(
          rootState.auth.authId
        ),
      })
      batch.update(userRef, {
        postsCount: firebase.firestore.FieldValue.increment(1),
      })
      await batch.commit()
      // Retrieve the current post for consistency and also to access the
      // timestamp from the server.
      const newPost = await postRef.get()
      commit('SET_ITEM', { resource: 'posts', item: newPost }, { root: true })
      commit(
        'threads/APPEND_POST_TO_THREAD',
        {
          parentId: post.threadId,
          childId: newPost.id,
        },
        { root: true }
      )
      commit(
        'threads/APPEND_CONTRIBUTOR_TO_THREAD',
        { parentId: post.threadId, childId: post.userId },
        { root: true }
      )
    },
    async updatePost({ commit, rootState }, { text, id }) {
      const post = {
        text,
        edited: {
          at: firebase.firestore.FieldValue.serverTimestamp(),
          by: rootState.auth.authId,
          moderated: false,
        },
      }
      // Write in db
      const postRef = firebase.firestore().collection('posts').doc(id)
      await postRef.update(post)
      // Fetch the current data
      const updatedPost = await postRef.get()
      commit(
        'SET_ITEM',
        { resource: 'posts', item: updatedPost },
        { root: true }
      )
    },
    fetchPost: makeFetchItemAction({ resource: 'posts', emoji: '💬' }),
    fetchPosts: makeFetchItemsAction({ resource: 'posts', emoji: '💬' }),
  },
  getters: {},
}
