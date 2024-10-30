'use client'

import Post from './Post'

import { Post as PostType } from '~/types/post'
import styles from './PostList.module.scss'

type Props = {
  posts: PostType[]
}

export default function PostList({ posts }: Props) {
  if (posts?.length === 0) {
    return null
  }

  return (
    <ul className={styles.posts}>
      {posts.map((post) => {
        return (
          <li className={styles.post} key={`${post.slug}`}>
            <Post {...post} />
          </li>
        )
      })}
    </ul>
  )
}
