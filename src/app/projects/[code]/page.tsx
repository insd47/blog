import { getProject, getProjectList } from '@/lib/content/projects';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: PageProps<'/projects/[code]'>) {
  const { code } = await params;
  const project = await getProject(code).catch(() => null);

  if (!project) notFound();

  const { title, createdAt, Content } = project;

  return (
    <main>
      <h1>{title}</h1>
      <time dateTime={createdAt.toISOString()}>{createdAt.toLocaleDateString()}</time>
      <Content />
    </main>
  );
}

export async function generateStaticParams() {
  return getProjectList().then((projects) => projects.map(({ code }) => ({ code })));
}

export const dynamicParams = false;
