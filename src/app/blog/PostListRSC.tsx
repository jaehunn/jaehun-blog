import PostList from './PostList'

import getAllContent from '~/utils/getAllContent'
import { Post as PostType } from '~/types/post'

export default async function PostListRSC() {
  const allContent = await getAllContent()

  const posts = (allContent ?? [])?.map(({ data, content }) => {
    return {
      ...data,
      body: content,
    }
  }) as PostType[]

  return <PostList posts={posts} />
}
