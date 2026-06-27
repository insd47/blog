import { importImage, importList, importDocument, importHeadings } from '@/lib/utils/content';
import { z } from 'zod';

export async function getPostList() {
  const slugs = await importList('content/posts');

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const [image, { metadata }, headings] = await Promise.all([
        importImage(import(`@/content/posts/${slug}/thumbnail.png`)),
        importDocument(import(`@/content/posts/${slug}/post.mdx`), scheme),
        importHeadings(`content/posts/${slug}/post.mdx`),
      ]);

      return { slug, image, ...metadata, ...headings };
    }),
  );

  return items.sort((a, b) => {
    const x = a.createdAt;
    const y = b.createdAt;

    return y.getTime() - x.getTime();
  });
}

export async function getPost(slug: string) {
  const [{ Content, metadata }, headings] = await Promise.all([
    importDocument(import(`@/content/posts/${slug}/post.mdx`), scheme),
    importHeadings(`content/posts/${slug}/post.mdx`),
  ]);

  return { ...headings, ...metadata, Content };
}

const scheme = z.object({
  description: z.string(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
