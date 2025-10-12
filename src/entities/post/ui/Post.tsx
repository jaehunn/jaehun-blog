import Link from 'next/link'

import { Badge } from '~/components/ui/badge'
import { date } from '~/shared/lib/date'

export type PostType = {
  /** 유형 */
  type: 'post' | 'book'

  /** 식별자 */
  id: string

  /** 제목 */
  title: string

  /** 설명 */
  description: string

  /** 내용 */
  body: string

  /** 생성일 */
  createdAt: string

  /** 업데이트일 */
  updatedAt: string

  /** Url */
  url: string
}

export const Post = ({ id, title, description, createdAt, type, url }: PostType) => {
  return (
    <Link key={id} href={url} className="group block">
      <article className="py-6 border-b border-border/40 last:border-b-0 hover:bg-accent/30 -mx-4 px-4 rounded-lg transition-all duration-200">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {type === 'book' ? 'Book' : 'Post'}
            </Badge>
            <time dateTime={createdAt}>{date.format(new Date(createdAt))}</time>
          </div>

          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">{title}</h3>

          <p className="text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
        </div>
      </article>
    </Link>
  )
}
