import projects from '@/lib/content/projects';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: PageProps<'/projects/[code]'>) {
  const { code } = await params;
  const project = await projects.get(code).catch(() => null);

  if (!project) notFound();

  const { title, stacks, date, Content } = project;

  return (
    <main>
      <h1>{title}</h1>
      <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>
      <Content />
    </main>
  );
}

export async function generateStaticParams() {
  return projects.list().then((projects) => projects.map(({ code }) => ({ code })));
}

export const dynamicParams = false;
