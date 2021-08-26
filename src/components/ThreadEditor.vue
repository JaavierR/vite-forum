<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="text"
        class="form-input"
        name="content"
        id="thread_content"
        cols="140"
        rows="8"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="$emit('cancel')">
        Cancel
      </button>
      <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup(_, { emit }) {
    const title = ref('')
    const text = ref('')

    const save = () => {
      emit('save', { title: title.value, text: text.value })
    }

    return { title, text, save }
  },
}
</script>
