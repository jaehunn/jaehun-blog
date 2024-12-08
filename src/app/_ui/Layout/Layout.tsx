import { Box, Container } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

import { Header } from './Header'
import { Main } from './Main'
import { Spacing } from '~/shared/ui'

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Box px="2" py="2">
      <Container size="2">
        <Header />

        <Spacing size="5" />

        <Main>{children}</Main>
      </Container>
    </Box>
  )
}
