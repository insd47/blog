import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import GithubSlugger from 'github-slugger';

export default function PostAside({ className, sections, ...props }: Props) {
  const slugger = new GithubSlugger();

  return (
    <aside
      {...props}
      className={cn('border-l font-mono p-4 text-[13px] text-muted-foreground/80', className)}
    >
      <h4 className="mb-4">On this Page</h4>
      {sections.map((item) => (
        <a
          key={item}
          className="block hover:text-foreground transition-colors"
          href={`#${slugger.slug(item)}`}
        >
          {item}
        </a>
      ))}
    </aside>
  );
}

interface Props extends ComponentProps<'aside'> {
  sections: string[];
}
