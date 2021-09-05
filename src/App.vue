<template>
  <TheNavbar />
  <div class="container">
    <RouterView v-show="showPage" @ready="showPage = true" />
    <div v-show="!showPage" class="push-top">loading...</div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import TheNavbar from './components/TheNavbar.vue'

export default {
  components: { TheNavbar },
  setup() {
    const store = useStore()
    const showPage = ref(false)
    const router = useRouter()

    store.dispatch('auth/fetchAuthUser')

    router.beforeEach(() => {
      showPage.value = false
    })

    return {
      showPage,
    }
  },
}
</script>

<style>
@import 'assets/style.css';
</style>
