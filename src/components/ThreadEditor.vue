<template>
  <VeeForm @submit="save">
    <AppFormField
      label="Title"
      name="title"
      v-model="form.title"
      rules="required"
    />

    <AppFormField
      as="textarea"
      label="Content"
      name="text"
      v-model="form.text"
      rules="required"
      rows="8"
      cols="140"
    />

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="$emit('cancel')">
        Cancel
      </button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ saveButtonText }}
      </button>
    </div>
  </VeeForm>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { title, text } = toRefs(props)
    const form = reactive({ title: title.value, text: text.value })

    const saveButtonText = computed(() => (title.value ? 'Update' : 'Publish'))

    const save = () => {
      emit('clean')
      emit('save', { ...form })
    }

    watch(
      form,
      () => {
        if (form.title !== title.value || form.text !== text.value) {
          emit('dirty')
        } else {
          emit('clean')
        }
      },
      { deep: true }
    )

    return { form, save, saveButtonText }
  },
}
</script>
