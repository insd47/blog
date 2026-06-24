import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Separator from '@/components/separator';
import config from '@/lib/config';
import { HeaderProvider } from '@/components/header/context';
import './globals.css';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <HeaderProvider>
      <html lang="ko" className="dark">
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
