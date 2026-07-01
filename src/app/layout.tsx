import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { HeaderProvider } from '@/components/header/context';
import { JetBrains_Mono } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Separator from '@/components/separator';
import config from '@/lib/config';
import './globals.css';
import { cn } from '@/lib/utils/cn';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <HeaderProvider>
      <html lang="ko" className={cn(jetbrains.variable)}>
        <body>
          <Header />
          <Separator />
          {children}
          <Separator />
          <Footer />
        </body>
      </html>
    </HeaderProvider>
  );
}

export const metadata: Metadata = config.metadata.base;

const jetbrains = JetBrains_Mono({
  variable: '--next-font-jetbrains',
  subsets: ['latin'],
  fallback: [],
});
