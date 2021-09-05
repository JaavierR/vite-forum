<template>
  <TheNavbar />
  <div class="container">
    <RouterView v-show="showPage" @ready="onPageReady" />
    <AppSpinner v-show="!showPage" class="mt-14" />
  </div>
</template>

<script>
import NProgress from 'nprogress'
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

    const onPageReady = () => {
      showPage.value = true
      NProgress.done()
    }

    store.dispatch('auth/fetchAuthUser')
    NProgress.configure({
      speed: 200,
      showSpinner: false,
    })
    router.beforeEach(() => {
      showPage.value = false
      NProgress.start()
    })

    return {
      showPage,
      onPageReady,
    }
  },
}
</script>

<style>
@import 'assets/style.css';
@import 'nprogress/nprogress.css';
#nprogress .bar {
  background: #57ad8d !important;
}
</style>
