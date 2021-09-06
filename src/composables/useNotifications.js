import { reactive } from 'vue'

const notifications = reactive([
  { id: 1, message: 'This is a test' },
  { id: 2, message: 'This is a test2' },
])

const addNotification = (notification) => {
  notifications.push({
    id: Math.random() + Date.now(),
    ...notification,
  })
}

const removeNotification = (id) => {
  const index = notifications.findIndex((item) => item.id === id)
  notifications.splice(index, 1)
}

export default function useNotifications() {
  return {
    notifications,
    addNotification,
    removeNotification,
  }
}
