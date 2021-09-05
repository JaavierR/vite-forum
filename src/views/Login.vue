<template>
  <div class="justify-center flex-grid">
    <div class="col-2">
      <form @submit.prevent="login" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="text"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="form-input"
          />
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="text-right form-actions">
          <RouterLink :to="{ name: 'Register' }">Create an account?</RouterLink>
        </div>
      </form>

      <div class="text-center push-top">
        <button class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup(_, { emit }) {
    emit('ready')
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      email: '',
      password: '',
    })

    const login = async () => {
      try {
        await store.dispatch('auth/signInWithEmailAndPassword', { ...form })
        router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }

    return { form, login }
  },
}
</script>
