<template>
  <img class="object-cover" :src="src || '/user-placeholder.png'" alt="" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
    },
  },
}
</script>
