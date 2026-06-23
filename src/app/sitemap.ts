import type { MetadataRoute } from 'next';
import { posts } from '@/lib/content/posts';
import config from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await posts.list();

  return [
    {
      url: config.metadata.url,
      lastModified: new Date(),
    },
    {
      url: `${config.metadata.url}/posts`,
      lastModified: new Date(),
    },
    ...allPosts.map((post) => ({
      url: `${config.metadata.url}/posts/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
