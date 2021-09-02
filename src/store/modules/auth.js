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
        {
          id: state.authId,
          emoji: '🔑',
          resource: 'users',
        },
        { root: true }
      ),
  },
  getters: {
    authUser: (state, _getters, _rootState, rootGetters) =>
      rootGetters['users/user'](state.authId),
  },
}
