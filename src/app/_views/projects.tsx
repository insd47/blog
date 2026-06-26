import Section from '@/app/_views/section';
import ProjectCard from '@/components/cards/project';
import Link from 'next/link';
import projects from '@/lib/content/projects';

export default async function Projects() {
  const list = await projects.list();
  const filtered = list.filter(({ code }) => ['kc', 'rv'].includes(code));

  return (
    <Section>
      <header>
        <Link className="h-full px-4 flex items-center gap-2.5" href="/projects">
          <h2>Projects</h2>
          <p className="no-underline! text-foreground/60">={'>'}</p>
        </Link>
      </header>
      <div>
        {filtered.map((project) => (
          <ProjectCard key={project.code} {...project} />
        ))}
      </div>
    </Section>
  );
}
