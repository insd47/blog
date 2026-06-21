import './globals.css';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/lib/providers/theme';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils/shadcn';
import { base as metadata } from '@/lib/config/metadata';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export { metadata };

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
