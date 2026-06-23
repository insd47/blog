import type { Metadata } from 'next';
import type { Post } from '@/lib/content/post';

export const base: Metadata = {
  metadataBase: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000',
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

export function basic(title: string, description = base.description!): Metadata {
  return {
    ...base,
    title,
    description,
    openGraph: { ...base.openGraph, title, description },
  };
}

export function post(post: Post): Metadata {
  return {
    ...basic(post.title, post.description),
    alternates: {
      ...base.alternates,
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      ...base.openGraph,
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/posts/${post.slug}`,
      publishedTime: post.date,
      authors: ['황인성'],
    },
  };
}
