import { cache } from 'react';
import { importList, importDocument, importImage, importHeadings } from '@/lib/utils/markdown';
import { z } from 'zod';

const projects = {
  list: cache(async () => {
    const codes = await importList('content/projects');

    const items = await Promise.all(
      codes.map(async (code) => {
        const [image, document, headings] = await Promise.all([
          importImage(`content/projects/${code}/banner.png`),
          importDocument(`content/projects/${code}/project.mdx`, scheme),
          importHeadings(`content/projects/${code}/project.mdx`),
        ]);

        return { code, image, ...headings, ...document };
      }),
    );

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }),

  get: cache(async (code: string) => {
    const [document, headings] = await Promise.all([
      importDocument(`content/projects/${code}/project.mdx`, scheme),
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
