'use client'

import Post from './Post'

import { Post as PostType } from '~/types/post'

type Props = {
  posts: PostType[]
}

export default function PostList({ posts }: Props) {
  if (posts?.length === 0) {
    return null
  }

  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={`${post.slug}`}>
            <Post {...post} />
          </li>
        )
      })}
    </ul>
  )
}
