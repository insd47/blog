import config from '@/lib/config';
import { getPostList } from '@/lib/content/posts';
import type { MetadataRoute } from 'next';
import { getProjectList } from '@/lib/content/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = config.metadata.url;
  const lastModified = new Date();
  const pages = ['', '/posts', '/projects'];

  const posts = await getPostList();
  const projects = await getProjectList();

  return [
    ...pages.map((page) => ({
      url: url + page,
      lastModified,
    })),
    ...posts.map(({ slug, createdAt }) => ({
      url: `${url}/posts/${slug}`,
      lastModified: createdAt,
    })),
    ...projects.map(({ code, date }) => ({
      url: `${url}/projects/${code}`,
      lastModified: date,
    })),
  ];
}
