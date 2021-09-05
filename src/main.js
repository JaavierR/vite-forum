import { createApp } from 'vue'
import firebase from 'firebase/app'
import App from '@/App.vue'
import firebaseConfig from '@/config/firebase'
import router from '@/router'
import store from '@/store'
import FontAwesome from '@/plugins/FontAwesome'
// Tailwind styles
import '@/index.css'

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('auth/fetchAuthUser')
  }
})

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)

// Import global components in the vite way.
const requireComponent = import.meta.globEager('./components/App*.vue')
Object.entries(requireComponent).forEach(([path, definition]) => {
  // Get name of component, based on filename
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  forumApp.component(componentName, definition.default)
})

forumApp.mount('#app')
