<template>
  <div ref="infiniteScroll" class="inersection-observer"></div>
</template>

<script>
import { ref, toRefs } from '@vue/reactivity'
import { onBeforeUnmount, onMounted, watch } from '@vue/runtime-core'

// Since we don't have access to this.$el in the setup method, we need to
// manage the DOM elements via refs, in this cause our ref is infiniteScroll.

export default {
  props: {
    done: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { done } = toRefs(props)
    const observer = ref(null)
    const infiniteScroll = ref(null)

    onMounted(() => {
      observer.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) emit('load')
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.9,
        }
      )
      observer.value.observe(infiniteScroll.value)
    })

    onBeforeUnmount(() => {
      observer.value.unobserve(infiniteScroll.value)
    })

    watch(done, () => {
      if (done.value) observer.value.unobserve(infiniteScroll.value)
    })
    return { infiniteScroll }
  },
}
</script>

<style scoped>
div {
  position: relative;
  z-index: -1;
  pointer-events: none;
  bottom: 200px;
}
</style>
