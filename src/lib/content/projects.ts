import { importList, importDocument, importSummary, importDate } from '@/lib/utils/content';
import { SortChain } from '@/lib/utils/chain';
import { z } from 'zod';
import { StaticImageData } from 'next/image';
import { ComponentType } from 'react';

export async function getProjectList() {
  const codes = await importList('content/projects');
  const items = await Promise.all(codes.map(getProject));

  return new SortChain(items)
    .sort((a, b) => +(b.index !== undefined) - +(a.index !== undefined))
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .sort((a, b) => +(b.period[1] === null) - +(a.period[1] === null))
    .sort((a, b) => (b.period[1] ?? b.period[0]).getTime() - (a.period[1] ?? a.period[0]).getTime())
    .toArray();
}

export async function getProject(code: string): Promise<Project> {
  const [{ Content, metadata }, summary, date] = await Promise.all([
    importDocument(import(`@/content/projects/${code}/project.mdx`), scheme),
    importSummary(`content/projects/${code}/project.mdx`),
    importDate(`content/projects/${code}/project.mdx`),
  ]);

  return { code, ...summary, ...metadata, date, Content };
}

const scheme = z.object({
  index: z.number().optional(),
  stacks: z.array(z.string()),
  period: z.tuple([z.string().pipe(z.coerce.date()), z.string().pipe(z.coerce.date()).nullable()]),
  banner: z.custom<StaticImageData>(),
});

interface Project extends z.infer<typeof scheme> {
  code: string;
  title: string;
  stacks: string[];
  date: Date;
  Content: ComponentType;
}
