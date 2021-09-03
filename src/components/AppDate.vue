<template>
  <span :title="humanFriendlyDate">
    {{ diffForHumans }}
  </span>
</template>

<script>
import { computed, toRefs } from '@vue/reactivity'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

export default {
  props: {
    timestamp: {
      type: [Number, Object],
      requried: true,
    },
  },
  setup(props) {
    const { timestamp } = toRefs(props)

    const normalizedTimestamp = computed(
      () => timestamp.value?.seconds || timestamp.value
    )

    const diffForHumans = computed(() =>
      dayjs.unix(normalizedTimestamp.value).fromNow()
    )

    const humanFriendlyDate = computed(() =>
      dayjs.unix(normalizedTimestamp.value).format('llll')
    )

    return { diffForHumans, humanFriendlyDate }
  },
}
</script>
