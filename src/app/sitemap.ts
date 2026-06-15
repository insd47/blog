import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/config/site';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getAllPosts({ includeDrafts: false });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    })),
  ];
}
