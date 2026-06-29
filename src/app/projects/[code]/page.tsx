import { getProject, getProjectList } from '@/lib/content/projects';
import { notFound } from 'next/navigation';
import { ImageSizesProvider } from '@/lib/provider/image';

export default async function ProjectPage({ params }: PageProps<'/projects/[code]'>) {
  const { code } = await params;
  const project = await getProject(code).catch(() => null);

  if (!project) notFound();

  const { title, Content } = project;

  return (
    <main>
      <h1>{title}</h1>
      <ImageSizesProvider sizes="(max-width: 1023px) 100vw, 960px" quality={95}>
        <Content />
      </ImageSizesProvider>
    </main>
  );
}

export async function generateStaticParams() {
  return getProjectList().then((projects) => projects.map(({ code }) => ({ code })));
}

export const dynamicParams = false;
