<template>
  <div class="col-full push-top">
    <h1>
      Create a new thread in <i>{{ forum.name }}</i>
    </h1>

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
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">
          Publish
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: {
    forum: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const title = ref('')
    const text = ref('')

    const save = () => {
      // vuex action
    }
    return {
      title,
      text,
    }
  },
}
</script>