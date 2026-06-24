'use client';

import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import { useSections } from '@/lib/hooks/sections';
import NextLink from 'next/link';

export default function PostAside({ className, sections, ...props }: Props) {
  const { slugs, current, scrollTo } = useSections(sections);

  return (
    <aside
      {...props}
      className={cn('border-l font-mono text-[13px] text-muted-foreground/80', className)}
    >
      <div className="p-4 sticky top-15">
        <h4 className="mb-4">Sections</h4>

        {slugs.map(([id, text]) => (
          <Link
            key={id}
            aria-current={current === id && 'location'}
            href={`#${id}`}
            className={cn(
              current === id && 'before:content-[">"] text-foreground before:text-foreground',
            )}
            onClick={(e) => scrollTo(e, id)}
          >
            {text}
          </Link>
        ))}

        <Link href="#" className='before:content-["↑"]' onClick={scrollTo}>
          Top
        </Link>
      </div>
    </aside>
  );
}

function Link({ href, className, ...props }: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      {...props}
      href={href}
      className={cn(
        'block relative mb-1.5 ps-4',
        'hover:text-foreground transition-colors',
        'before:content-["*"] before:absolute before:left-0 before:top-0 before:text-foreground/30',
        className,
      )}
    />
  );
}

interface Props extends ComponentProps<'aside'> {
  sections: string[];
}
