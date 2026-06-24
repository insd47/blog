import { cache } from 'react';
import { importList, importContent } from '@/lib/utils/markdown';
import { z } from 'zod';

const projects = {
  list: cache(async () => {
    const slugs = await importList('content/projects');
    const items = await Promise.all(
      slugs.map(async (slug) => ({
        slug,
        ...(await importContent(`content/projects/${slug}/project.mdx`, scheme)),
      })),
    );

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }),

  get: cache((slug: string) => importContent(`content/projects/${slug}/project.mdx`, scheme)),
};

const scheme = z.object({
  stacks: z.array(z.string()),
  date: z.date(),
});

export default projects;
