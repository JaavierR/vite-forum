import { createRouter, createWebHistory } from 'vue-router'

// Views
import Home from '@/views/Home.vue'
import ThreadShow from '@/views/ThreadShow.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
