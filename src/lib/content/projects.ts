import { cache } from 'react';
import { importList, importDocument, importImage, importHeadings } from '@/lib/utils/content';
import { z } from 'zod';

const projects = {
  list: cache(async () => {
    const codes = await importList('content/projects');

    const items = await Promise.all(
      codes.map(async (code) => {
        const [image, { stacks, date }, headings] = await Promise.all([
          importImage(import(`@/content/projects/${code}/banner.png`)),
          importDocument(import(`@/content/projects/${code}/project.mdx`), scheme),
          importHeadings(`content/projects/${code}/project.mdx`),
        ]);

        if (!image) {
          throw new Error(`Image not found: content/projects/${code}/banner.png`);
        }

        return { code, image, stacks, date, ...headings };
      }),
    );

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }),

  get: cache(async (code: string) => {
    const [document, headings] = await Promise.all([
      importDocument(import(`@/content/projects/${code}/project.mdx`), scheme),
      importHeadings(`content/projects/${code}/project.mdx`),
    ]);

    return { ...headings, ...document };
  }),
};

const scheme = z.object({
  stacks: z.array(z.string()),
  date: z.date(),
});

export default projects;
