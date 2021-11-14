<template>
  <div class="profile-card">
    <VeeForm @submit="save">
      <p class="text-center avatar-edit">
        <label for="avatar" class="avatar">
          <AppAvatarImage
            :src="activeUser.avatar"
            :alt="`${user.name} profile picture`"
            class="mx-auto mb-2 avatar-xlarge img-update"
          />
          <div class="avatar-upload-overlay">
            <AppSpinner v-if="uploadingImage" color="white" />
            <fa v-else icon="camera" size="3x" class="text-white opacity-80" />
          </div>
          <input
            v-show="false"
            type="file"
            id="avatar"
            accept="image/*"
            @change="handleAvatarUpload"
          />
        </label>
      </p>

      <UserProfileCardEditorRandomAvatar @hit="activeUser.avatar = $event" />

      <AppFormField
        label="Username"
        name="username"
        v-model="activeUser.username"
        :rules="`required|unique:users,username,${user.username}`"
      />

      <AppFormField
        label="Full Name"
        name="name"
        v-model="activeUser.name"
        rules="required"
      />

      <AppFormField
        label="Bio"
        name="bio"
        as="textarea"
        v-model="activeUser.bio"
        rules="required"
        placeholder="Write a few words about yourself."
      />

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr />

      <AppFormField
        label="Website"
        name="website"
        v-model="activeUser.website"
        rules="url"
      />

      <AppFormField
        label="Email"
        name="email"
        v-model="activeUser.email"
        :rules="`required|email|unique:users,email,${user.email}`"
      />

      <AppFormField
        label="Location"
        name="location"
        v-model="activeUser.location"
        list="locations"
        @mouseenter="loadLocationOptions"
      />

      <datalist id="locations">
        <option
          v-for="location in locationOptions"
          :key="location.name.common"
          :value="location.name.common"
        />
      </datalist>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="btn-blue">save</button>
      </div>
    </VeeForm>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import UserProfileCardEditorRandomAvatar from '@/components/UserProfileCardEditorRandomAvatar.vue'
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: { UserProfileCardEditorRandomAvatar },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const uploadingImage = ref(false)
    const locationOptions = ref([])

    // * We use reactive to maintain reactivy in the object,
    // also the dot operator allow us to clone the object and prevent
    // making changes in the user of the vuex.
    const activeUser = reactive({ ...props.user })

    const handleAvatarUpload = async (e) => {
      uploadingImage.value = true
      const file = e.target.files[0]
      const uploadedImage = await store.dispatch('auth/uploadAvatar', {
        file,
      })
      activeUser.avatar = uploadedImage || activeUser.avatar
      uploadingImage.value = false
    }

    const handleRandomAvatarUpload = async () => {
      const randomAvatarGenerated = activeUser.avatar.startsWith(
        'https://pixabay'
      )
      if (randomAvatarGenerated) {
        const image = await fetch(activeUser.avatar)
        const blob = await image.blob()
        activeUser.avatar = await store.dispatch('auth/uploadAvatar', {
          file: blob,
          filename: 'random',
        })
      }
    }

    const loadLocationOptions = async () => {
      if (locationOptions.value.length) return
      const res = await fetch('https://restcountries.com/v3.1/all')
      locationOptions.value = await res.json()
    }

    const save = async () => {
      // Here we need to clone the object to avoid bound the activeUser object
      // with the user inside the state in users module.

      // * To set object's value to a variable, I should pass a cloned object instead.
      await handleRandomAvatarUpload()
      store.dispatch('users/updateUser', { ...activeUser })
      router.push({ name: 'Profile' })
    }

    const cancel = () => {
      router.push({ name: 'Profile' })
    }

    return {
      locationOptions,
      activeUser,
      uploadingImage,

      save,
      cancel,
      handleAvatarUpload,
      loadLocationOptions,
    }
  },
}
</script>
