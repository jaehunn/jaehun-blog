import './globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { OpenSans } from '@/fonts';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className={OpenSans.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
