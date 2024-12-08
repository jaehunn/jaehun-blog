import { Flex } from '@radix-ui/themes'

import { Navigator } from './Navigator'
import { Logo } from './Logo'

export const Header = () => {
  return (
    <Flex align="center" justify="between">
      <Logo />
      <Navigator />
    </Flex>
  )
}
