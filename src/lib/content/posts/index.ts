import { cache } from 'react';
import { importSlugs, importPost } from '@/lib/content/posts/importer';

const posts = {
  list: cache(async () => {
    const slugs = await importSlugs();
    const items = await Promise.all(slugs.map((slug) => importPost(slug)));

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }),

  get: cache(async (slug: string) => await importPost(slug)),
};

export type Post = Awaited<ReturnType<typeof posts.get>>;
export default posts;
