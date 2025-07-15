'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Theme } from '@radix-ui/themes'
import { useIsClient } from 'usehooks-ts'

export function ThemeProvider({ children }: PropsWithChildren<unknown>) {
  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return (
    <NextThemeProvider attribute="class">
      <Theme>{children}</Theme>
    </NextThemeProvider>
  )
}
