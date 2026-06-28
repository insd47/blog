import config from '@/lib/config';
import { getPostList } from '@/lib/content/posts';
import type { MetadataRoute } from 'next';
import { getProjectList } from '@/lib/content/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = config.metadata.url;

  const posts = await getPostList();
  const projects = await getProjectList();


  const postLastModified = getLastModified(posts);
  const projectLastModified = getLastModified(projects);
  const lastModified = getLastModified([...posts, ...projects]);

  const pages = [
    { path: '', lastModified },
    { path: '/posts', lastModified: postLastModified },
    { path: '/projects', lastModified: projectLastModified },
  ];

  return [
    ...pages.map(({ path, lastModified }) => ({
      url: url + path,
      ...(lastModified && { lastModified }),
    })),
    ...posts.map(({ slug, date }) => ({
      url: `${url}/posts/${slug}`,
      lastModified: date,
    })),
    ...projects.map(({ code, date }) => ({
      url: `${url}/projects/${code}`,
      lastModified: date,
    })),
  ];
}

function getLastModified(items: { date: Date }[]) {
  return items.reduce<Date | undefined>((latest, item) => {
    if (!latest || item.date > latest) return item.date;
    return latest;
  }, undefined);
}
