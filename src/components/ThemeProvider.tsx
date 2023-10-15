'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <NextThemeProvider enableSystem enableColorScheme defaultTheme="dark">
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
