import { cache } from 'react';
import { importList, importContent } from '@/lib/utils/markdown';
import { z } from 'zod';

const posts = {
  list: cache(async () => {
    const slugs = await importList('content/posts');
    const items = await Promise.all(
      slugs.map(async (slug) => ({
        slug,
        ...(await importContent(`content/posts/${slug}/post.mdx`, scheme)),
      })),
    );

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }),

  get: cache((slug: string) => importContent(`content/posts/${slug}/post.mdx`, scheme)),
};

const scheme = z.object({
  description: z.string(),
  tags: z.array(z.string()),
  date: z.date(),
});

export default posts;
