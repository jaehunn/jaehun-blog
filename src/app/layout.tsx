import '~/styles/globals.css'

import type { Metadata } from 'next'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/react'

import ROUTES from '~/constants/routes'
import { OpenSans } from '~/fonts'
import styles from './layout.module.scss'
import { Spacing } from '~/components/Spacing'

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className={OpenSans.variable}>
      <body>
        <main className={styles.main}>
          <header className={styles.header}>
            <div>
              <Link href={'/'}>Jaehun Dev</Link>
            </div>

            <Spacing type="large" />

            <nav>
              <ul>
                {Object.values(ROUTES).map(({ PATH, NAME }) => {
                  return (
                    <li key={PATH}>
                      <Link href={PATH}>{NAME}</Link>
                    </li>
                  )
                })}

                <Link href={'./rss.xml'}>RSS</Link>
              </ul>
            </nav>
          </header>

          <Spacing />

          <article className={styles.article}>{children}</article>
        </main>

        {/* @see https://vercel.com/docs/analytics/package */}
        <Analytics />
      </body>
    </html>
  )
}

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
        url: `https://jaehun.dev/api/og?title=${encodeURIComponent(
          'JAEHUN DEV'
        )}`,
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

  /** @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#themecolor */
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e6edf3' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2328' },
  ],

  /** @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates */
  alternates: {
    types: {
      'application/rss+xml': 'https://jaehun.dev/rss.xml',
    },
  },
}
