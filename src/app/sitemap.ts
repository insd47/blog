import posts from '@/lib/content/posts';
import config from '@/lib/config';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = config.metadata.url;
  const lastModified = new Date();
  const pages = ['', '/posts', '/projects'];
  const allPosts = await posts.list();

  return [
    ...pages.map((page) => ({
      url: url + page,
      lastModified,
    })),
    ...allPosts.map(({ slug, date }) => ({
      url: `${url}/posts/${slug}`,
      lastModified: date,
    })),
  ];
}
