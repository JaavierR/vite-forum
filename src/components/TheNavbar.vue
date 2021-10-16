<template>
  <header
    class="header"
    id="header"
    v-click-outside="() => (mobileNavMenu = false)"
    v-page-scroll="() => (mobileNavMenu = false)"
  >
    <RouterLink :to="{ name: 'Home' }" class="logo">
      <img src="@/assets/svg/vueschool-logo.svg" alt="" />
    </RouterLink>

    <div class="btn-hamburger" @click="mobileNavMenu = !mobileNavMenu">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <nav class="navbar" :class="{ 'navbar-open': mobileNavMenu }">
      <ul>
        <li v-if="authUser" class="navbar-user">
          <a
            @click.prevent="userDropdownOpen = !userDropdownOpen"
            v-click-outside="() => (userDropdownOpen = false)"
          >
            <AppAvatarImage
              class="avatar-small"
              :src="authUser.avatar"
              :alt="`${authUser.name} profile picture`"
            />
            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="@/assets/svg/arrow-profile.svg"
                alt=""
              />
            </span>
          </a>

          <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpen }">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <RouterLink :to="{ name: 'Profile' }">View Profile</RouterLink>
              </li>
              <li class="dropdown-menu-item">
                <a @click.prevent="signOut">Sign Out</a>
              </li>
            </ul>
          </div>
        </li>

        <li v-if="!authUser" class="navbar-item">
          <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <RouterLink :to="{ name: 'Register' }">Register</RouterLink>
        </li>
        <li v-if="authUser" class="navbar-mobile-item">
          <RouterLink :to="{ name: 'Profile' }">View Profile</RouterLink>
        </li>
        <li v-if="authUser" class="navbar-mobile-item">
          <a @click.prevent="signOut">Sign Out</a>
        </li>
      </ul>

      <!-- <ul>
        <li class="navbar-item"><a href="#">Home</a></li>
      </ul> -->
    </nav>
  </header>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const userDropdownOpen = ref(false)
    const mobileNavMenu = ref(false)

    router.beforeEach(() => {
      mobileNavMenu.value = false
    })

    const authUser = computed(() => store.getters['auth/authUser'])

    const signOut = () => {
      store.dispatch('auth/signOut')
      mobileNavMenu.value = false
      router.push({ name: 'Home' })
    }

    return {
      userDropdownOpen,
      mobileNavMenu,

      authUser,
      signOut,
    }
  },
}
</script>
