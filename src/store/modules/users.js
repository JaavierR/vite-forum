import sourceData from '@/data'

export default {
  namespaced: true,
  state: {
    users: sourceData.users,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  mutations: {},
  actions: {},
  getters: {
    authUser: (state) => state.users.find((user) => user.id === state.authId),
  },
}
