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
      type: Number,
      requried: true,
    },
  },
  setup(props) {
    const { timestamp } = toRefs(props)

    const diffForHumans = computed(() => dayjs.unix(timestamp.value).fromNow())

    const humanFriendlyDate = computed(() =>
      dayjs.unix(timestamp.value).format('llll')
    )

    return { diffForHumans, humanFriendlyDate }
  },
}
</script>
