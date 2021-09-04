import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  fetchItem({ commit }, { id, emoji, resource }) {
    console.log('🔥', emoji, id)
    return new Promise((resolve) => {
      const unsubscribe = firebase
        .firestore()
        .collection(resource)
        .doc(id)
        .onSnapshot((doc) => {
          const item = { ...doc.data(), id: doc.id }
          commit('SET_ITEM', { resource, item })
          resolve(item)
        })
      commit('APPEND_UNSUBSCRIBE', { unsubscribe })
    })
  },
  fetchItems({ dispatch }, { ids, resource, emoji }) {
    return Promise.all(
      ids.map((id) => dispatch('fetchItem', { id, emoji, resource }))
    )
  },
  async unsubscribeAllSnapshots({ state, commit }) {
    state.unsubscribes.forEach((unsubscribe) => unsubscribe())
    commit('CLEAR_ALL_UNSUBSCRIBES')
  },
}
