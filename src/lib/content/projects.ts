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
    const x = a.updatedAt ?? a.createdAt;
    const y = b.updatedAt ?? b.createdAt;

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

const scheme = z.object({
  stacks: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
