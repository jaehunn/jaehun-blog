import Link from 'next/link'

import { Post as PostType } from '~/types/post'
import styles from './Post.module.scss'
import { Spacing } from '~/components/Spacing'

type Props = PostType & {
  // ...
}

export default function Post({ slug, title, description, createdAt }: Props) {
  return (
    <Link className={styles.post} href={`/blog/${slug}`}>
      <h4>{title}</h4>

      <p>{description}</p>

      <Spacing type="small" />

      <span>
        {new Intl.DateTimeFormat('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(createdAt))}
      </span>
    </Link>
  )
}
