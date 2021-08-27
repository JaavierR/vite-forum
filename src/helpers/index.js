// * Helpers allow us to write DRY code & also extract some
// * lengthier code.
export const findById = (resources, id) => resources.find((r) => r.id === id)

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
