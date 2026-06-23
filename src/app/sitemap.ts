import type { MetadataRoute } from 'next';
import { posts } from '@/lib/content/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ).replace(/\/$/, '');
  const allPosts = await posts.list();

  return [
    {
      url: origin,
      lastModified: new Date(),
    },
    {
      url: `${origin}/posts`,
      lastModified: new Date(),
    },
    ...allPosts.map((post) => ({
      url: `${origin}/posts/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
