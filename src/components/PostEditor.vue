<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="text"
        />
        <div class="form-actions">
          <button class="btn-blue">Submit post</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

export default {
  setup(_, { emit }) {
    const text = ref('')

    const save = () => {
      const post = {
        text: text.value,
        publishedAt: Math.floor(Date.now() / 1000),
        userId: 'HJNTR1nN8tgbB148RJrPYbby8Vl1',
      }
      emit('save', { post }) // Can access under eventData.post

      text.value = ''
    }

    return { text, save }
  },
}
</script>
