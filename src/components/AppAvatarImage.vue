<template>
  <img :src="src || '/user-placeholder.png'" alt="" />
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
