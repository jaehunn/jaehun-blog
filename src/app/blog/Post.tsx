import Link from 'next/link'

import { Post as PostType } from '~/types/post'

type Props = PostType & {
  // ...
}

export default function Post({ slug, title, description, createdAt }: Props) {
  return (
    <div>
      <Link href={`/blog/${slug}`}>
        <h4>{title}</h4>

        <div>
          <span>
            {new Intl.DateTimeFormat('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(createdAt))}
          </span>
        </div>

        <p>{description}</p>
      </Link>
    </div>
  )
}
