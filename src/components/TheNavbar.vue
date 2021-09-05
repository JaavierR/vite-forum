<template>
  <header class="header" id="header">
    <RouterLink :to="{ name: 'Home' }" class="logo">
      <img src="@/assets/svg/vueschool-logo.svg" alt="" />
    </RouterLink>

    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <nav class="navbar">
      <ul>
        <li v-if="authUser" class="navbar-user">
          <RouterLink :to="{ name: 'Profile' }">
            <img
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
          </RouterLink>

          <div id="user-dropdown">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item"><a href="#">View Profile</a></li>
              <li class="dropdown-menu-item"><a href="#">Log out</a></li>
            </ul>
          </div>
        </li>
      </ul>

      <!-- <ul>
        <li class="navbar-item"><a href="#">Home</a></li>
      </ul> -->
    </nav>
  </header>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const authUser = computed(() => store.getters['auth/authUser'])
    return {
      authUser,
    }
  },
}
</script>
