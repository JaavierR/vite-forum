<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="form.title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="form.text"
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
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ saveButtonText }}
      </button>
    </div>
  </form>
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
