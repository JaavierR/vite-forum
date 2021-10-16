// * Helpers allow us to write DRY code & also extract some
// * lengthier code.
export const findById = (resources, id) => {
  if (!resources) return null
  return resources.find((r) => r.id === id)
}

// * upsert: update the resource if it exists, and if it doesn't exist, add it.
// * to the array of resources.
// * Update and Insert smooshed togehter.
export const upsert = (resources, resource) => {
  const index = resources.findIndex((r) => r.id === resource.id)
  if (resource.id && index !== -1) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}

// * When a function is defined after it is called (eg. in the mutations of the
// * store) It always use the old syntax.
// * Variables declared with let and const must be declared before hey are used.

// * See hoisting for: function name (...) {...}
// * Hoisting => The function behaves as if it were hoisted to the top of the
// * file and defined before it was called.
export const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId)
    if (!resource) {
      console.warn(
        `Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent didn't exist`
      )
      return
    }
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}

export const docToResource = (doc) => {
  if (typeof doc?.data !== 'function') return doc
  return { ...doc.data(), id: doc.id }
}

export const makeFetchItemAction = ({ resource, emoji }) => {
  return ({ dispatch }, payload) =>
    dispatch('fetchItem', { resource, emoji, ...payload }, { root: true })
}

export const makeFetchItemsAction = ({ resource, emoji }) => {
  return ({ dispatch }, payload) =>
    dispatch('fetchItems', { resource, emoji, ...payload }, { root: true })
}

export const arrayRandom = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
