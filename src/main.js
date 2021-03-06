import { createApp } from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import App from '@/App.vue'
import firebaseConfig from '@/config/firebase'
import router from '@/router'
import store from '@/store'
import FontAwesome from '@/plugins/FontAwesome'
import ClickOutsideDirective from '@/plugins/ClickOutsideDirective'
import PageScrollDirective from '@/plugins/PageScrollDirective'
import Vue3Pagination from '@/plugins/Vue3Pagination'
import VeeValidatePlugin from '@/plugins/VeeValidatePlugin'
// Tailwind styles
import '@/index.css'

firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
forumApp.use(Vue3Pagination)
forumApp.use(VeeValidatePlugin)

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
