'use client'

import { Post, PostType } from '~/entities/post/ui/Post'

type Props = {
  posts: PostType[]
}

export const PostList = ({ posts }: Props) => {
  if (!posts?.length) {
    return null
  }

  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Post {...post} />
          </li>
        )
      })}
    </ul>
  )
}
