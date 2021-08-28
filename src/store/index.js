import { createStore } from 'vuex'

import auth from './modules/auth'
import categories from './modules/categories'
import forums from './modules/forums'
import posts from './modules/posts'
import users from './modules/users'
import threads from './modules/threads'

const store = createStore({
  modules: {
    auth,
    categories,
    forums,
    posts,
    users,
    threads,
  },
})

export default store
