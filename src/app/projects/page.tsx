import type { Metadata } from 'next';
import config from '@/lib/config';
import projects from '@/lib/content/projects';
import ProjectCard from '@/components/cards/project';
import Separator from '@/components/separator';
import Banner from '@/components/banner';

export default async function ProjectsPage() {
  const list = await projects.list();

  return (
    <main>
      <Banner asChild>
        <header className="text-2xl flex flex-center px-6">
          <h1>Projects</h1>
        </header>
      </Banner>

      <Separator />

      {list.map((project) => (
        <ProjectCard key={project.code} {...project} />
      ))}
    </main>
  );
}

export const metadata: Metadata = config.metadata.basic('Projects');
