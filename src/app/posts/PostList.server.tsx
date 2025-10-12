import { sortBy } from 'lodash-es'

import { PostList } from './PostList'
import { getPosts } from '~/entities/post/api/get-posts'

export const PostListRSC = async () => {
  const posts = await getPosts()

  const latestPosts = sortBy(posts, 'createdAt').reverse()

  return <PostList posts={latestPosts} />
}
