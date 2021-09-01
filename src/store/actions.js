import firebase from 'firebase'

export default {
  fetchItem({ commit }, { id, emoji, resource }) {
    console.log('🔥', emoji, id)
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection(resource)
        .doc(id)
        .onSnapshot((doc) => {
          const item = { ...doc.data(), id: doc.id }
          commit('SET_ITEM', { resource, item })
          resolve(item)
        })
    })
  },
}
