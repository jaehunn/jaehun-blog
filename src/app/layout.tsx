import './globals.css';

import type { Metadata } from 'next';
import Link from 'next/link';
import { FiRss as RssIcon } from '@react-icons/all-files/fi/FiRss';
import { PropsWithChildren } from 'react';

import styles from './layout.module.scss';
import ROUTES from '@/constants/routes';
import { OpenSans } from '@/fonts';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className={OpenSans.variable}>
      <body>
        <main className={styles['content-container']}>
          <div className={styles['content-wrapper']}>
            <header className={styles['header']}>
              <div>
                <Link href={'/'}>Jaehun Dev</Link>
              </div>

              <nav className={styles['header-nav']}>
                <ul>
                  {Object.values(ROUTES).map(({ PATH, NAME }) => {
                    return (
                      <li key={PATH}>
                        <Link href={PATH}>{NAME}</Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </header>

            <article>{children}</article>

            <footer className={styles['footer']}>
              <nav className={styles['footer-nav']}>
                <ul>
                  <li>
                    <Link href={'/rss.xml'}>
                      <RssIcon size={20} />
                      RSS
                    </Link>
                  </li>
                </ul>
              </nav>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
