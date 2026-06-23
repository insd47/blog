import Section from '@/app/_views/section';
import ProjectCard from '@/components/list/project';
import Link from 'next/link';
import config from '@/lib/config';

export default function Projects() {
  return (
    <Section>
      <header>
        <Link className="h-full px-4 flex items-center gap-2.5" href="/projects">
          <h2>Projects</h2>
          <p className="decoration-0 text-foreground/60">={'>'}</p>
        </Link>
      </header>
      <div>
        {config.projects.map(({ id, ...project }) => (
          <ProjectCard key={id} id={id} {...project} />
        ))}
      </div>
    </Section>
  );
}
