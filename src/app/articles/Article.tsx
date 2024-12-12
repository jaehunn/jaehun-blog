import Link from 'next/link'

import { Article as ArticleModel } from '~/entities/article/model'
import { Badge, Card, Flex, Text } from '@radix-ui/themes'
import { dateFormatter } from '~/shared/lib/date'

export const Article = ({ id, title, description, createdAt, url }: ArticleModel) => {
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
              {dateFormatter.format(new Date(createdAt))}
            </Badge>
          </Flex>
        </Card>
      </Flex>
    </Link>
  )
}
