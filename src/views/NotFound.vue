<template>
  <div class="text-center col-full">
    <h1>Not Found</h1>
    <RouterLink :to="{ name: 'Home' }">Read some cool threads.</RouterLink>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>
