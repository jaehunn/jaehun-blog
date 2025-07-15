import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/next'

import { ThemeProvider } from '~/providers/theme-provider'
import { nanumSquare } from '~/fonts/nanumSquare'

import '~/styles/reset.css'
import '@radix-ui/themes/styles.css'
import '~/styles/markdown.css'
import '~/styles/global.css'
import { Container, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

export const metadata: Metadata = {
  /** @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields */
  metadataBase: new URL('https://jaehun.dev'),
  title: {
    template: '%s | Jaehun',
    default: 'Jaehun',
  },
  description: "Jaehun's blog.",
  keywords: 'Jaehun, frontend developer, web developer, next.js',

  /** @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph */
  openGraph: {
    title: 'Jaehun',
    description: "Jaehun's personal blog.",
    url: 'https://jaehun.dev',
    siteName: "Jaehun's website",
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: `https://jaehun.dev/api/og?title=${encodeURIComponent('jaehun dev')}`,
        width: 1200,
        height: 600,
        alt: "Jaehun's personal blog",
      },
    ],
  },

  /** @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#robots */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  /** @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#icons */
  icons: {
    shortcut: 'https://jaehun.dev/favicon.ico',
  },

  /** @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates */
  alternates: {
    types: {
      'application/rss+xml': 'https://jaehun.dev/rss.xml',
    },
  },
}

export default async function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="ko">
      <body className={`${nanumSquare.variable}`}>
        <ThemeProvider>
          <Container size="4" px="4" py="6" height="100%">
            <Flex gap="2" justify="end">
              <Link href="/about">
                <Text size="4">About</Text>
              </Link>
              <Link href="/articles">
                <Text size="4">Articles</Text>
              </Link>
            </Flex>

            <main>{children}</main>
          </Container>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
