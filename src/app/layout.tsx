import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from '@/shared/theme';
import './globals.css';
import './animation.css';

const roboto = Roboto_Flex({
  variable: '--font-roboto',
  subsets: [],
});

export const metadata: Metadata = {
  title: 'Dice game',
  description: 'The test task for Zionix',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ height: '100%' }}>
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
