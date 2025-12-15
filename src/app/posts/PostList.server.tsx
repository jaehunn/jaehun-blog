import { sortBy } from 'lodash-es'

import { PostListWithPagination } from './PostListWithPagination'
import { getPosts } from '~/entities/post/api/get-posts'

export const PostListRSC = async () => {
  const posts = await getPosts()

  const latestPosts = sortBy(posts, 'createdAt').reverse()

  return <PostListWithPagination posts={latestPosts} />
}
