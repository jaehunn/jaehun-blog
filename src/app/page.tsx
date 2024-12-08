import { Box, Card, Flex, Heading, Link, Text } from '@radix-ui/themes'
import { BackpackIcon, EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

import { Spacing } from '~/shared/ui'

export default function Home() {
  return (
    <Box>
      <Heading as="h1">방재훈</Heading>
      <Spacing size="1" />
      <Text as="p">
        운좋게 몰입할 수 있는 것을 찾아 개발자로 일을 하고 있습니다. 모르는 세상의 것을 배우고 익히는 것에 게을리하지
        않았으면 좋겠습니다.
        <br />
        읽고 쓰기, 커피, 좋아하는 사람과 대화 그리고 달리기를 좋아합니다.
      </Text>

      <Spacing size="6" />

      <Card>
        <Flex gap="3" align="center">
          <BackpackIcon />
          <Box>
            <Text as="div" size="2" color="gray">
              Bungaejangter Inc. (Contents Lab, Web Frontend)
            </Text>
          </Box>
        </Flex>
      </Card>

      <Card>
        <Flex gap="3" align="center">
          <EnvelopeClosedIcon />
          <Box>
            <Text as="div" size="2" color="gray">
              qkdwogns98@gmail.com
            </Text>
          </Box>
        </Flex>
      </Card>

      <Card>
        <Flex gap="3" align="center">
          <GitHubLogoIcon />
          <Box>
            <Link href="https://github.com/jaehunn" size="2" color="gray" referrerPolicy="no-referrer" target="_blank">
              https://github.com/jaehunn
            </Link>
          </Box>
        </Flex>
      </Card>

      <Card>
        <Flex gap="3" align="center">
          <LinkedInLogoIcon />
          <Box>
            <Link
              href="https://kr.linkedin.com/in/jaehunn"
              size="2"
              color="gray"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              https://kr.linkedin.com/in/jaehunn
            </Link>
          </Box>
        </Flex>
      </Card>
    </Box>
  )
}
