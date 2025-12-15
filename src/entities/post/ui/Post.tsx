import Link from 'next/link'
import Image from 'next/image'

import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { DefaultImage } from '~/components/ui/default-image'
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

  /** 썸네일 */
  thumbnail?: string

  /** 생성일 */
  createdAt: string

  /** 업데이트일 */
  updatedAt: string

  /** Url */
  url: string
}

export const Post = ({ id, title, description, createdAt, type, url, thumbnail }: PostType) => {
  return (
    <Link key={id} href={url} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div className="relative w-full h-64 overflow-hidden bg-muted">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <DefaultImage seed={id} className="w-full h-full" />
          )}
        </div>

        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {type === 'book' ? 'Book' : 'Post'}
            </Badge>
            <time className="text-xs text-muted-foreground" dateTime={createdAt}>
              {date.format(new Date(createdAt))}
            </time>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>

        {description && (
          <CardContent>
            <CardDescription className="line-clamp-3 leading-relaxed">
              {description}
            </CardDescription>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
