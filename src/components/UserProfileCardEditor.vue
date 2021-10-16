<template>
  <div class="profile-card">
    <form @submit.prevent="save">
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
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
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

    const handleAvatarUpload = async (e) => {
      uploadingImage.value = true
      const file = e.target.files[0]
      const uploadedImage = await store.dispatch('auth/uploadAvatar', {
        file,
      })
      activeUser.avatar = uploadedImage || activeUser.avatar
      uploadingImage.value = false
    }

    const cancel = () => {
      router.push({ name: 'Profile' })
    }

    return {
      activeUser,
      uploadingImage,

      save,
      cancel,
      handleAvatarUpload,
    }
  },
}
</script>
