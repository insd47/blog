import { cache } from 'react';
import { importImage, importList, importDocument, importHeadings } from '@/lib/utils/content';
import { z } from 'zod';

const posts = {
  list: cache(async () => {
    const slugs = await importList('content/posts');

    const items = await Promise.all(
      slugs.map(async (slug) => {
        const [image, { description, tags, date }, headings] = await Promise.all([
          importImage(import(`@/content/posts/${slug}/thumbnail.png`)),
          importDocument(import(`@/content/posts/${slug}/post.mdx`), scheme),
          importHeadings(`content/posts/${slug}/post.mdx`),
        ]);

        return { slug, image, description, tags, date, ...headings };
      }),
    );

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }),

  get: cache(async (slug: string) => {
    const [document, headings] = await Promise.all([
      importDocument(import(`@/content/posts/${slug}/post.mdx`), scheme),
      importHeadings(`content/posts/${slug}/post.mdx`),
    ]);

    return { ...headings, ...document };
  }),
};

const scheme = z.object({
  description: z.string(),
  tags: z.array(z.string()),
  date: z.date(),
});

export default posts;
