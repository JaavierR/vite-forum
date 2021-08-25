<template>
  <div class="profile-card">
    <form @submit.prevent="save">
      <p class="text-center">
        <img
          :src="user.avatar"
          :alt="`${user.name} profile picture`"
          class="mx-auto avatar-xlarge img-update"
        />
      </p>

      <div class="form-group">
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <label for="user_bio"></label>
        <textarea
          v-model="activeUser.bio"
          name="user_bio"
          id="user_bio"
          placeholder="Write a few words about yourself."
          class="form-input"
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postCount }} posts</span>
        <span>{{ user.threadCount }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          v-model="activeUser.website"
          type="text"
          autocomplete="off"
          class="form-input"
          id="user_website"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          v-model="activeUser.email"
          type="text"
          autocomplete="off"
          class="form-input"
          id="user_email"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          v-model="activeUser.location"
          type="text"
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="btn-blue">save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    // * We use reactive to maintain reactivy in the object,
    // also the dot operator allow us to clone the object and prevent
    // making changes in the user of the vuex.
    const activeUser = reactive({ ...props.user })

    const save = () => {
      // Here we need to clone the object to avoid bound the activeUser object
      // with the user inside the state in users module.

      // * To set object's value to a variable, I should pass a cloned object instead.
      store.dispatch('users/updateUser', { ...activeUser })
      router.push({ name: 'Profile' })
    }

    const cancel = () => {
      router.push({ name: 'Profile' })
    }

    return {
      activeUser,

      save,
      cancel,
    }
  },
}
</script>
