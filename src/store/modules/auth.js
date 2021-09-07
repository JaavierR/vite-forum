import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    authId: null,
    authUserUnsubscribe: null,
    authObserverUnsubscribe: null,
  },
  mutations: {
    SET_AUTH_ID(state, id) {
      state.authId = id
    },
    SET_AUTH_USER_UNSUBSCRIBE(state, unsubscribe) {
      state.authUserUnsubscribe = unsubscribe
    },
    SET_AUTH_OBSERVER_UNSUBSCRIBE(state, unsubscribe) {
      state.authObserverUnsubscribe = unsubscribe
    },
  },
  actions: {
    initAuthentication({ dispatch, commit, state }) {
      if (state.authObserverUnsubscribe) state.authObserverUnsubscribe()
      return new Promise((resolve) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          console.log('👣 the user has changed')
          dispatch('unsubscribeAuthUserSnapshot')
          if (user) {
            await dispatch('fetchAuthUser')
            resolve(user)
          } else {
            resolve(null)
          }
        })
        commit('SET_AUTH_OBSERVER_UNSUBSCRIBE', unsubscribe)
      })
    },
    async registerUserWithEmailAndPassword(
      { dispatch },
      { name, email, password, username, avatar = null }
    ) {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      // Upload avatar to firestore storage
      if (avatar) {
        const storageBucket = firebase
          .storage()
          .ref()
          .child(`uploads/${user.uid}/images/${Date.now()}-${avatar.name}`)
        const snapshot = await storageBucket.put(avatar)
        avatar = await snapshot.ref.getDownloadURL()
      }
      // Register and create the user in the firebase
      await dispatch(
        'users/createUser',
        { id: user.uid, email, name, username, avatar },
        { root: true }
      )
    },
    signInWithEmailAndPassword(_, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    async signOut({ commit }) {
      await firebase.auth().signOut()
      commit('SET_AUTH_ID', null)
    },
    async signInWithGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider()
      const { user } = await firebase.auth().signInWithPopup(provider)
      const userRef = firebase.firestore().collection('users').doc(user.uid)
      const userDoc = await userRef.get()
      if (!userDoc.exists) {
        return dispatch(
          'users/createUser',
          {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            username: user.email,
            avatar: user.photoURL,
          },
          { root: true }
        )
      }
    },
    fetchAuthUser: async ({ dispatch, commit }) => {
      const userId = firebase.auth().currentUser?.uid
      if (!userId) return
      await dispatch(
        'fetchItem',
        {
          resource: 'users',
          id: userId,
          emoji: '🔑',
          handleUnsubscribe: (unsubscribe) => {
            commit('SET_AUTH_USER_UNSUBSCRIBE', unsubscribe)
          },
        },
        { root: true }
      )
      commit('SET_AUTH_ID', userId)
    },
    async unsubscribeAuthUserSnapshot({ state, commit }) {
      if (state.authUserUnsubscribe) {
        state.authUserUnsubscribe()
        commit('SET_AUTH_USER_UNSUBSCRIBE', null)
      }
    },
    async fetchAuthUserPosts({ state, commit }, { startAfter }) {
      let query = firebase
        .firestore()
        .collection('posts')
        .where('userId', '==', state.authId)
        .orderBy('publishedAt', 'desc')
        .limit(10)

      if (startAfter) {
        const doc = await firebase
          .firestore()
          .collection('posts')
          .doc(startAfter.id)
          .get()
        query = query.startAfter(doc)
      }

      const posts = await query.get()

      posts.forEach((item) => {
        commit('SET_ITEM', { resource: 'posts', item }, { root: true })
      })
    },
  },
  getters: {
    authUser: (state, _getters, _rootState, rootGetters) =>
      rootGetters['users/user'](state.authId),
  },
}
