<template>
  <div class="justify-center flex-grid">
    <div class="col-2">
      <VeeForm @submit.prevent="login" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <VeeField
            name="email"
            rules="required"
            v-model="form.email"
            id="email"
            type="text"
            class="form-input"
          />
          <VeeErrorMessage name="email" class="form-error" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <VeeField
            name="password"
            rules="required"
            v-model="form.password"
            id="password"
            type="password"
            class="form-input"
          />
          <VeeErrorMessage name="password" class="form-error" />
        </div>

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
