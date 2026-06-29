import config from '@/lib/config';
import { getPostList } from '@/lib/content/posts';
import type { MetadataRoute } from 'next';
import { getProjectList } from '@/lib/content/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = config.metadata.url;
  const posts = await getPostList();
  const projects = await getProjectList();

  const record: Record<string, Date> = {
    '': new Date(),
    '/posts': posts.reduce((c, { date }) => (date && date > c ? date : c), new Date('1970-01-01')),
    '/projects': projects.reduce(
      (c, { date }) => (date && date > c ? date : c),
      new Date('1970-01-01'),
    ),
  };

  for (const post of posts) {
    record[`/posts/${post.slug}`] = post.date;
  }

  for (const project of projects) {
    record[`/projects/${project.code}`] = project.date;
  }

  return Object.entries(record).map(([path, lastModified]) => ({ url: url + path, lastModified }));
}
