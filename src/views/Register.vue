<template>
  <div class="justify-center flex-grid">
    <div class="col-2">
      <VeeForm @submit="register" class="card card-form">
        <h1 class="text-center">Register</h1>

        <AppFormField
          v-model="form.name"
          name="name"
          label="Name"
          rules="required"
        />

        <AppFormField
          v-model="form.username"
          name="username"
          label="Username"
          rules="required"
        />

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
          rules="required|min:8"
          type="password"
        />

        <div class="form-group">
          <label for="avatar">
            Avatar
            <div v-if="avatarPreview">
              <img :src="avatarPreview" class="avatar-xlarge" />
            </div>
          </label>
          <VeeField
            name="avatar"
            v-show="!avatarPreview"
            id="avatar"
            type="file"
            class="form-input"
            @change="handleImageUpload"
            accept="image/*"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>
      </VeeForm>
      <div class="text-center push-top">
        <button @click.prevent="registerWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup(_, { emit }) {
    emit('ready')
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const avatarPreview = ref(null)

    const form = reactive({
      name: '',
      username: '',
      email: '',
      password: '',
      avatar: '',
    })

    const successRedirect = () => {
      const redirectTo = route.query.redirectTo || { name: 'Home' }
      router.push(redirectTo)
    }

    const register = async () => {
      await store.dispatch('auth/registerUserWithEmailAndPassword', form)
      successRedirect()
    }

    const registerWithGoogle = async () => {
      await store.dispatch('auth/signInWithGoogle')
      successRedirect()
    }

    const handleImageUpload = (e) => {
      form.avatar = e.target.files[0]
      // To display the img we need a FileReader
      const reader = new FileReader()
      reader.onload = (event) => {
        avatarPreview.value = event.target.result
      }
      reader.readAsDataURL(form.avatar)
    }

    return {
      avatarPreview,
      form,
      register,
      registerWithGoogle,
      handleImageUpload,
    }
  },
}
</script>
