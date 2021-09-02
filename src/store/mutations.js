import { upsert } from '@/helpers'

export default {
  SET_ITEM(state, { resource, item }) {
    upsert(state[resource][resource], item)
  },
}