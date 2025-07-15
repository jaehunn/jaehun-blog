import Link from 'next/link'

import { Badge, Card, Flex, Text } from '@radix-ui/themes'
import { date } from '~/utils/date'

export type ArticleType = {
  /** 유형 */
  type: 'article' | 'book'

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

export const Article = ({ id, title, description, createdAt, url }: ArticleType) => {
  return (
    <Link key={id} href={url}>
      <Flex direction="column" py="2" gap="3">
        <Card variant="surface">
          <Text as="div" size="2" weight="bold" truncate>
            {title}
          </Text>
          <Text as="div" color="gray" size="2" truncate>
            {description}
            <div></div>
          </Text>

          <Flex justify="end">
            <Badge variant="solid" radius="none" color="gray">
              {date.format(new Date(createdAt))}
            </Badge>
          </Flex>
        </Card>
      </Flex>
    </Link>
  )
}
