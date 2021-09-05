import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    authId: null,
    authUserUnsubscribe: null,
  },
  mutations: {
    SET_AUTH_ID(state, id) {
      state.authId = id
    },
    SET_AUTH_USER_UNSUBSCRIBE(state, unsubscribe) {
      state.authUserUnsubscribe = unsubscribe
    },
  },
  actions: {
    async registerUserWithEmailAndPassword(
      { dispatch },
      { name, email, password, username, avatar = null }
    ) {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
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
    fetchAuthUser: ({ state, dispatch, commit }) => {
      const userId = firebase.auth().currentUser?.uid
      if (!userId) return
      commit('SET_AUTH_ID', userId)
      dispatch(
        'fetchItem',
        {
          resource: 'users',
          id: state.authId,
          emoji: '🔑',
          handleUnsubscribe: (unsubscribe) => {
            commit('SET_AUTH_USER_UNSUBSCRIBE', unsubscribe)
          },
        },
        { root: true }
      )
    },
    async unsubscribeAuthUserSnapshot({ state, commit }) {
      if (state.authUserUnsubscribe) {
        state.authUserUnsubscribe()
        commit('SET_AUTH_USER_UNSUBSCRIBE', null)
      }
    },
  },
  getters: {
    authUser: (state, _getters, _rootState, rootGetters) =>
      rootGetters['users/user'](state.authId),
  },
}
