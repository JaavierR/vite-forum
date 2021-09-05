import { ref, getCurrentInstance } from 'vue'

export default function useDataStatus() {
  const ready = ref(false)
  const { emit } = getCurrentInstance()

  const fetched = () => {
    ready.value = true
    emit('ready')
  }

  return {
    ready,
    fetched,
  }
}
