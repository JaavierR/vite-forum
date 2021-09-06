import firebase from 'firebase/app'
import { makeFetchItemAction, makeFetchItemsAction } from '@/helpers'

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {},
  actions: {
    fetchCategory: makeFetchItemAction({ resource: 'categories', emoji: '🏷' }),
    fetchCategories: makeFetchItemsAction({
      resource: 'categories',
      emoji: '🏷',
    }),
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
