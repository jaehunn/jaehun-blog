'use client';

import Post from './Post';

import styles from './PostList.module.scss';
import { Post as PostType } from '@/types/post';

type Props = {
  posts: PostType[];
};

export default function PostList({ posts }: Props) {
  if (posts?.length === 0) {
    return null;
  }

  return (
    <ul className={styles['wrapper']}>
      {posts.map((post) => {
        return (
          <>
            <li key={`${post.slug}`}>
              <Post {...post} />
            </li>
            <li key={`${post.slug}`}>
              <Post {...post} />
            </li>
          </>
        );
      })}
    </ul>
  );
}
