import firebase from 'firebase/app'

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
      await batch.commit()
      // Retrieve the current post for consistency and also to access the
      // timestamp from the server.
      const newPost = await postRef.get()
      commit(
        'SET_ITEM',
        { resource: 'posts', item: { ...newPost.data(), id: newPost.id } },
        { root: true }
      )
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
    fetchPost: ({ dispatch }, { id }) =>
      dispatch(
        'fetchItem',
        { resource: 'posts', id, emoji: '💬' },
        { root: true }
      ),
    fetchPosts: ({ dispatch }, { ids }) =>
      dispatch(
        'fetchItems',
        {
          ids,
          emoji: '💬',
          resource: 'posts',
        },
        { root: true }
      ),
  },
  getters: {},
}
