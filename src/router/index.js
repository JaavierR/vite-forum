import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

// Views
import Home from '@/views/Home.vue'
import Category from '@/views/Category.vue'
import Forum from '@/views/Forum.vue'
import ThreadShow from '@/views/ThreadShow.vue'
import Profile from '@/views/Profile.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true,
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // Check if thread exists
      const threadExists = store.state.threads.threads.find(
        (thread) => thread.id === to.params.id
      )
      // if exists continue
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash,
        })
      }
      // if does not exist redirect to not found
    },
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
  },
  // When we define a route, we can define components props
  //  by passing an object to the props option.
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
