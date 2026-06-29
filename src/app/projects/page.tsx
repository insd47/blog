import type { Metadata } from 'next';
import config from '@/lib/config';
import { getProjectList } from '@/lib/content/projects';
import ProjectCard from '@/components/cards/project';
import Separator from '@/components/separator';
import Banner from '@/components/banner';

export default async function ProjectsPage() {
  const projects = await getProjectList();

  return (
    <main>
      <Banner asChild>
        <header className="text-2xl flex flex-center px-6">
          <h1>Projects</h1>
        </header>
      </Banner>

      <Separator />

      {projects.map(({ code, title, stacks, banner }) => (
        <ProjectCard key={code} code={code} title={title} stacks={stacks} banner={banner} />
      ))}
    </main>
  );
}

export const metadata: Metadata = config.metadata.basic('Projects');
