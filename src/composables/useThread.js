import store from '@/store'

export default function useThread() {
  const fetchThread = async (id) => {
    // fetch the thread
    const thread = await store.dispatch('threads/fetchThread', { id })

    // fetch the user
    store.dispatch('users/fetchUser', { id: thread.userId })

    // fetch the posts
    const posts = await store.dispatch('posts/fetchPosts', {
      ids: thread.posts,
    })

    // fetch the users associated with the posts
    const users = posts.map((post) => post.userId)
    store.dispatch('users/fetchUsers', { ids: users })
  }

  return { fetchThread }
}
