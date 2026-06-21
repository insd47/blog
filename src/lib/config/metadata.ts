import type { Metadata } from 'next';
import type { Post } from '@/lib/content/post';
import { getSiteUrl, siteConfig } from './site';

const description = siteConfig.description;

export const base: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description,
  },
};

export function basic(title: string, pageDescription = description): Metadata {
  return {
    ...base,
    title,
    description: pageDescription,
    openGraph: {
      ...base.openGraph,
      title,
      description: pageDescription,
    },
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
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
  };
}
