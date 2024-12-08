'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Flex, TabNav } from '@radix-ui/themes'

export const Navigator = () => {
  const pathname = usePathname()

  return (
    <Flex gap="2" align="center">
      <TabNav.Root>
        <TabNav.Link asChild active={pathname === '/'}>
          <Link href="/">About</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/articles'}>
          <Link href="/articles">Articles</Link>
        </TabNav.Link>
      </TabNav.Root>

      <Button size="2" variant="soft">
        <Link href="/rss.xml">RSS</Link>
      </Button>
    </Flex>
  )
}
