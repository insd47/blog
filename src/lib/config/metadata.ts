import type { Metadata } from 'next';

export const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export const base: Metadata = {
  metadataBase: url,
  title: {
    default: '황인성',
    template: '%s | 황인성',
  },
  description: 'Junior Software Engineer',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '황인성',
    title: '황인성 / INSUNG HWANG',
    description: 'Junior Software Engineer',
    images: '/og.png',
  },
  icons: {
    icon: [
      { url: '/favicon/light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon/dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};
