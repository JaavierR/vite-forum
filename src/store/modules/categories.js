import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {},
  actions: {
    fetchCategory: ({ dispatch }, { id }) =>
      dispatch(
        'fetchItem',
        { id, emoji: '🏷', resource: 'categories' },
        { root: true }
      ),
    fetchCategories: ({ dispatch }, { ids }) =>
      dispatch(
        'fetchItems',
        { ids, emoji: '🏷', resource: 'categories' },
        { root: true }
      ),
    fetchAllCategories({ commit }) {
      console.log('🔥', '🏷', 'all')
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('categories')
          .onSnapshot((querySnapshot) => {
            const categories = querySnapshot.docs.map((doc) => {
              const item = { id: doc.id, ...doc.data() }
              commit(
                'SET_ITEM',
                { resource: 'categories', item },
                { root: true }
              )
              return item
            })
            resolve(categories)
          })
      })
    },
  },
  getters: {},
}
