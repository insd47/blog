import Section from '@/app/_views/section';
import ProjectCard from '@/components/cards/project';
import Link from 'next/link';
import { getProjectList } from '@/lib/content/projects';

export default async function Projects() {
  const projects = await getProjectList();

  return (
    <Section>
      <header>
        <Link className="h-full px-4 flex items-center gap-2.5" href="/projects">
          <h2>Projects</h2>
          <p className="no-underline! text-foreground/60">={'>'}</p>
        </Link>
      </header>
      <div>
        {projects.slice(0, 3).map(({ code, title, stacks, image }) => (
          <ProjectCard
            key={code}
            className="last:border-0"
            code={code}
            title={title}
            stacks={stacks}
            image={image}
          />
        ))}
      </div>
    </Section>
  );
}
