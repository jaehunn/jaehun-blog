import Link from 'next/link'

import styles from './Post.module.css'
import { Post as PostType } from '~/types/post'

type Props = PostType & {
  // ...
}

export default function Post({ slug, title, description, createdAt }: Props) {
  return (
    <div className={styles['wrapper']}>
      <Link href={`/blog/${slug}`}>
        <h4 className={styles['title']}>{title}</h4>

        <div className={styles['createdAt']}>
          <span>
            {new Intl.DateTimeFormat('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(createdAt))}
          </span>
        </div>

        <p className={styles['description']}>{description}</p>
      </Link>
    </div>
  )
}
