import { Box } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

export const Main = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Box py="9">
      <main>{children}</main>
    </Box>
  )
}
