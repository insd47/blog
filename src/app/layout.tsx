import type { Metadata } from 'next';
import './globals.css';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/lib/providers/theme';
import { Inter } from 'next/font/google';
import { cn } from '@/utils/shadcn';
import { getSiteUrl, siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn('font-sans', inter.variable)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
