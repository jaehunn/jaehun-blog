import { PropsWithChildren } from 'react';

import styles from './layout.module.css';

export const metadata = {
  title: 'Blog',
  description: '',
  alternates: {
    canonical: '',
  },
};

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <div className={styles['wrapper']}>{children}</div>;
}
