import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import { findById } from '@/helpers'

// Views
import Home from '@/views/Home.vue'
import Category from '@/views/Category.vue'
import Forum from '@/views/Forum.vue'
import ThreadShow from '@/views/ThreadShow.vue'
import ThreadCreate from '@/views/ThreadCreate.vue'
import ThreadEdit from '@/views/ThreadEdit.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
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
    async beforeEnter(to, _, next) {
      await store.dispatch('threads/fetchThread', { id: to.params.id })
      // Check if thread exists
      const threadExists = findById(store.state.threads.threads, to.params.id)
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
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true, requiresAuth: true },
  },
  // When we define a route, we can define components props
  //  by passing an object to the props option.
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: '/logout',
    name: 'Logout',
    async beforeEnter() {
      await store.dispatch('auth/signOut')
      return { name: 'Home' }
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
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
  scrollBehavior(to) {
    const scroll = {}

    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'

    return scroll
  },
})

router.beforeEach(async (to, from) => {
  await store.dispatch('auth/initAuthentication')
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)
  store.dispatch('unsubscribeAllSnapshots')

  const authId = store.state.auth.authId

  if (to.meta.requiresAuth && !authId) {
    return { name: 'Login', query: { redirectTo: to.path } }
  }

  if (to.meta.requiresGuest && authId) {
    return { name: 'Home' }
  }
})

export default router
