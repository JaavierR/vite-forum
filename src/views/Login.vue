<template>
  <div class="justify-center flex-grid">
    <div class="col-2">
      <VeeForm @submit="login" class="card card-form">
        <h1 class="text-center">Login</h1>

        <AppFormField
          v-model="form.email"
          name="email"
          label="Email"
          rules="required|email"
          type="email"
        />

        <AppFormField
          v-model="form.password"
          name="password"
          label="Password"
          rules="required"
          type="password"
        />

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="text-right form-actions">
          <RouterLink :to="{ name: 'Register' }">Create an account?</RouterLink>
        </div>
      </VeeForm>

      <div class="text-center push-top">
        <button @click.prevent="signInWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup(_, { emit }) {
    emit('ready')
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const form = reactive({
      email: '',
      password: '',
    })

    const successRedirect = () => {
      const redirectTo = route.query.redirectTo || { name: 'Home' }
      router.push(redirectTo)
    }

    const login = async () => {
      try {
        await store.dispatch('auth/signInWithEmailAndPassword', { ...form })
        successRedirect()
      } catch (error) {
        alert(error.message)
      }
    }

    const signInWithGoogle = async () => {
      await store.dispatch('auth/signInWithGoogle')
      successRedirect()
    }

    return { form, login, signInWithGoogle }
  },
}
</script>
