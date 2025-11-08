import { PropsWithChildren } from 'react';

export default function PrivacyLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 max-w-3xl w-full px-4 py-8 mx-auto md:px-8 md:py-16">
      {children}
    </main>
  )
}