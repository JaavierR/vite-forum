import firebase from 'firebase/app'

export default {
  fetchItem(
    { commit },
    { id, emoji, resource, handleUnsubscribe = null, once = false }
  ) {
    console.log('🔥', emoji, id)
    return new Promise((resolve) => {
      const unsubscribe = firebase
        .firestore()
        .collection(resource)
        .doc(id)
        .onSnapshot((doc) => {
          if (once) {
            unsubscribe()
          }
          if (doc.exists) {
            const item = { ...doc.data(), id: doc.id }
            commit('SET_ITEM', { resource, item })
            resolve(item)
          } else {
            resolve(null)
          }
        })

      if (handleUnsubscribe) {
        handleUnsubscribe(unsubscribe)
      } else {
        commit('APPEND_UNSUBSCRIBE', { unsubscribe })
      }
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
