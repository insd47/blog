import Section from '@/app/_views/section';
import ProjectCard from '@/components/cards/project';
import Link from 'next/link';
import { getProjectList } from '@/lib/content/projects';

export default async function ProjectSection() {
  const projects = await getProjectList();

  return (
    <Section>
      <header>
        <Link className="h-full px-4 flex items-center gap-2.5" href="/projects">
          <h2>Projects</h2>
          <p className="no-underline! text-foreground/60">={'>'}</p>
        </Link>
      </header>
      {projects
        .filter(({ index }) => !!index)
        .map(({ code, title, stacks, banner }) => (
          <ProjectCard
            key={code}
            className="last:border-0"
            code={code}
            title={title}
            stacks={stacks}
            banner={banner}
          />
        ))}
    </Section>
  );
}
