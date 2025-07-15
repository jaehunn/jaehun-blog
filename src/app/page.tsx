import { Avatar, Flex, Heading, Link, Text } from '@radix-ui/themes'
import { EnvelopeOpenIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { Spacing } from '~/components/space'
import profileImage from '~/images/profile.png'

export default function Home() {
  return (
    <Flex direction="column" gap="2" align="center">
      <Spacing size="9" />

      <Link href="/">
        <Avatar size="9" radius="full" src={profileImage.src} fallback="👤" />
      </Link>

      <Spacing size="5" />

      <Heading as="h1" size="8">
        방재훈
      </Heading>
      <Text size="4">Web Frontend Developer</Text>

      <Text size="3" color="gray">
        Bungaejangter Inc.
      </Text>

      <Spacing size="2" />

      <Flex gap="2" align="center">
        <Link href="mailto:qkdwogns98@gmail.com" target="_blank">
          <EnvelopeOpenIcon color="black" />
        </Link>

        <Link href="https://github.com/jaehunn" target="_blank">
          <GitHubLogoIcon color="black" />
        </Link>

        <Link href="https://kr.linkedin.com/in/jaehunn" target="_blank">
          <LinkedInLogoIcon color="black" />
        </Link>
      </Flex>
    </Flex>
  )
}
