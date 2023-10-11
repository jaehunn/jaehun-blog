import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Blog',
  description: '',
  alternates: {
    canonical: '',
  },
};

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <>{children}</>;
}
