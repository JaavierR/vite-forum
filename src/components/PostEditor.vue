<template>
  <div class="col-full">
    <VeeForm @submit="save" :key="formKey">
      <div class="form-group">
        <AppFormField
          as="textarea"
          name="text"
          v-model="postCopy.text"
          rows="10"
          cols="30"
          rules="required"
        />
        <div class="form-actions">
          <button class="btn-blue">{{ buttonLabel }}</button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  props: {
    post: {
      type: Object,
      default: () => ({ text: null }),
    },
  },
  setup(props, { emit }) {
    const formKey = ref(Math.random())
    const postCopy = ref({ ...props.post })
    const buttonLabel = computed(() =>
      postCopy.value.id ? 'Update Post' : 'Submit Post'
    )

    const save = () => {
      emit('save', { post: postCopy.value }) // Can access under eventData.post

      postCopy.value.text = ''
      formKey.value = Math.random()
    }

    return { formKey, postCopy, buttonLabel, save }
  },
}
</script>
