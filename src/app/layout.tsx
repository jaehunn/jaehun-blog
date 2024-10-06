import '@/styles/globals.css';

import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiRss as RssIcon } from '@react-icons/all-files/fi/FiRss';
import { PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/react';

import ThemeProvider from '@/components/ThemeProvider';

/** CSR */
const ThemeToggleButton = dynamic(() => import('@/components/ThemeToggleButton'), { ssr: false });

import * as styles from './layout.css';
import ROUTES from '@/constants/routes';
import { OpenSans } from '@/fonts';
import { Client } from '@notionhq/client';

export default async function RootLayout({ children }: PropsWithChildren<unknown>) {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const queryResponse = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  console.log(queryResponse.properties);

  return (
    <html lang="en" className={OpenSans.variable}>
      <body>
        <ThemeProvider>
          <main className={styles['contentContainer']}>
            <div className={styles['contentWrapper']}>
              <header className={styles['header']}>
                <div>
                  <Link href={'/'}>Jaehun Dev</Link>
                </div>

                <nav>
                  <ul className={styles['headerNavList']}>
                    <li className={styles['headerNavItem']} key={`theme-toggle-button`}>
                      <ThemeToggleButton />
                    </li>

                    {Object.values(ROUTES).map(({ PATH, NAME }) => {
                      return (
                        <li className={styles['headerNavItem']} key={PATH}>
                          <Link href={PATH}>{NAME}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </header>

              <article>{children}</article>

              <footer className={styles['footer']}>
                <nav>
                  <ul className={styles['footerNavList']}>
                    <li className={styles['footerNavItem']}>
                      <Link href={'./rss.xml'}>
                        <RssIcon size={20} />
                        RSS
                      </Link>
                    </li>
                  </ul>
                </nav>
              </footer>
            </div>
          </main>

          {/* @see https://vercel.com/docs/analytics/package */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
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
        url: `https://jaehun.dev/api/og?title=${encodeURIComponent('JAEHUN DEV')}`,
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
};
