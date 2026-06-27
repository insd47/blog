import { importList, importDocument, importImage, importHeadings } from '@/lib/utils/content';
import { z } from 'zod';

export async function getProjectList() {
  const codes = await importList('content/projects');

  const items = await Promise.all(
    codes.map(async (code) => {
      const [image, { metadata }, headings] = await Promise.all([
        importImage(import(`@/content/projects/${code}/banner.png`)),
        importDocument(import(`@/content/projects/${code}/project.mdx`), scheme),
        importHeadings(`content/projects/${code}/project.mdx`),
      ]);

      if (!image) {
        throw new Error(`Image not found: content/projects/${code}/banner.png`);
      }

      return { code, image, ...metadata, ...headings };
    }),
  );

  return items.sort((a, b) => {
    const x = a.date;
    const y = b.date;

    return y.getTime() - x.getTime();
  });
}

export async function getProject(code: string) {
  const [{ Content, metadata }, headings] = await Promise.all([
    importDocument(import(`@/content/projects/${code}/project.mdx`), scheme),
    importHeadings(`content/projects/${code}/project.mdx`),
  ]);

  return { ...headings, ...metadata, Content };
}

const scheme = z
  .object({
    stacks: z.array(z.string()),
    published: z.string().pipe(z.coerce.date()),
    date: z.string().pipe(z.coerce.date()).optional(),
  })
  .transform(({ published, date, ...metadata }) => ({
    ...metadata,
    published,
    date: date ?? published,
  }));
