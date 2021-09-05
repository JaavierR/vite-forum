export default {
  namespaced: true,
  state: {
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  mutations: {},
  actions: {
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
