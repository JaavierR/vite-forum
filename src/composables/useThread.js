import store from '@/store'

export default function useThread() {
  const fetchThread = async (id) => {
    // fetch the thread
    const thread = await store.dispatch('threads/fetchThread', {
      id,
    })

    // fetch the user
    store.dispatch('users/fetchUser', { id: thread.userId })

    // fetch the posts
    thread.posts.forEach(async (postId) => {
      const post = await store.dispatch('posts/fetchPost', {
        id: postId,
      })
      store.dispatch('users/fetchUser', { id: post.userId })
    })
  }

  return { fetchThread }
}
