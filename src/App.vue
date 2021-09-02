<template>
  <the-navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import TheNavbar from './components/TheNavbar.vue'
export default {
  components: { TheNavbar },
  setup() {
    const store = useStore()

    store.dispatch('auth/fetchAuthUser')
  },
}
</script>

<style>
@import 'assets/style.css';
</style>
