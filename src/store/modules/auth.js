import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  namespaced: true,
  state: {
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  mutations: {},
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
    fetchAuthUser: ({ state, dispatch }) =>
      dispatch(
        'fetchItem',
        { resource: 'users', id: state.authId, emoji: '🔑' },
        { root: true }
      ),
  },
  getters: {
    authUser: (state, _getters, _rootState, rootGetters) =>
      rootGetters['users/user'](state.authId),
  },
}
