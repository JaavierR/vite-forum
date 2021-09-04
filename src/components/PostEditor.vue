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
          v-model="postCopy.text"
        />
        <div class="form-actions">
          <button class="btn-blue">{{ buttonLabel }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

export default {
  props: {
    post: {
      type: Object,
      default: () => ({ text: null }),
    },
  },
  setup(props, { emit }) {
    const postCopy = ref({ ...props.post })
    const buttonLabel = computed(() =>
      postCopy.value.id ? 'Update Post' : 'Submit Post'
    )

    const save = () => {
      emit('save', { post: postCopy.value }) // Can access under eventData.post

      postCopy.value.text = ''
    }

    return { postCopy, buttonLabel, save }
  },
}
</script>
