import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    authId: null,
  },
  mutations: {
    SET_AUTH_ID: (state, id) => (state.authId = id),
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
    fetchAuthUser: ({ state, dispatch, commit }) => {
      const userId = firebase.auth().currentUser?.uid
      if (!userId) return
      commit('SET_AUTH_ID', userId)
      dispatch(
        'fetchItem',
        { resource: 'users', id: state.authId, emoji: '🔑' },
        { root: true }
      )
    },
  },
  getters: {
    authUser: (state, _getters, _rootState, rootGetters) =>
      rootGetters['users/user'](state.authId),
  },
}
