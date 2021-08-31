import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/index.css'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '@/config/firebase'

initializeApp(firebaseConfig)

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)

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
