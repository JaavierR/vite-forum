<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <VeeField
      :name="name"
      :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)"
      :label="label"
      :id="name"
      class="form-input"
      v-bind="$attrs"
    />
    <VeeErrorMessage :name="name" class="form-error" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
}
</script>
