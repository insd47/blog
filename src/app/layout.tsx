import './globals.css';
import { PropsWithChildren } from 'react';
import { base as metadata } from '@/lib/config/metadata';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Separator from '@/components/separator';

export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className="dark">
      <body>
        <Header />
        <Separator />
        {children}
        <Separator />
        <Footer />
      </body>
    </html>
  );
}
