import { importDocument, importSummary, importList, importDate } from '@/lib/utils/content';
import { z } from 'zod';
import { StaticImageData } from 'next/image';
import { ComponentType } from 'react';

export async function getPostList() {
  const slugs = await importList('content/posts');
  const items = await Promise.all(slugs.map(getPost));

  return items.sort((a, b) => {
    const x = a.published;
    const y = b.published;

    return y.getTime() - x.getTime();
  });
}

export async function getPost(slug: string): Promise<Post> {
  const [{ Content, metadata }, summary, date] = await Promise.all([
    importDocument(import(`@/content/posts/${slug}/post.mdx`), scheme),
    importSummary(`content/posts/${slug}/post.mdx`),
    importDate(`content/posts/${slug}/post.mdx`),
  ]);

  return { slug, ...summary, ...metadata, date, Content };
}

const scheme = z.object({
  tags: z.array(z.string()),
  published: z.string().pipe(z.coerce.date()),
  thumbnail: z.custom<StaticImageData>(),
});

interface Post extends z.infer<typeof scheme> {
  slug: string;
  title: string;
  sections: string[];
  date: Date | null;
  Content: ComponentType;
}
