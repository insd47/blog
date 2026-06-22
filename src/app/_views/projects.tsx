import Section from '@/app/_views/section';
import Link from 'next/link';

export default function Projects() {
  return (
    <Section>
      <header>
        <Link className="h-full px-4 flex items-center gap-2.5" href="/projects">
          <h2>Projects</h2>
          <p className="decoration-0 text-foreground/60">={'>'}</p>
        </Link>
      </header>
      <div className="h-40 "></div>
    </Section>
  );
}
