import { ref } from 'vue'

export default function useDataStatus() {
  const ready = ref(false)

  const fetched = () => {
    ready.value = true
  }

  return {
    ready,
    fetched,
  }
}
