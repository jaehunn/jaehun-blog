import { getPosts } from './get-posts'

export const getPostById = async (id: string) => {
  const posts = await getPosts()

  const post = posts.find((post) => post.id === id)

  if (post == null) {
    return null
  }

  return post
}
