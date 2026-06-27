import type { Metadata } from 'next';
import config from '@/lib/config';
import { getProjectList } from '@/lib/content/projects';
import ProjectCard from '@/components/cards/project';
import Separator from '@/components/separator';
import Banner from '@/components/banner';

export default async function ProjectsPage() {
  const list = await getProjectList();

  return (
    <main>
      <Banner asChild>
        <header className="text-2xl flex flex-center px-6">
          <h1>Projects</h1>
        </header>
      </Banner>

      <Separator />

      {list.map(({ code, title, stacks, image }) => (
        <ProjectCard key={code} code={code} title={title} stacks={stacks} image={image} />
      ))}
    </main>
  );
}

export const metadata: Metadata = config.metadata.basic('Projects');
