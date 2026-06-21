import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/config/site';
import { posts } from '@/lib/content/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const allPosts = await posts.list();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
    },
    ...allPosts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
