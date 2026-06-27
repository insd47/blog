'use client';

import { ComponentProps, type MouseEvent, useMemo, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import NextLink from 'next/link';
import GithubSlugger from 'github-slugger';
import { useScrollFrame } from '@/lib/hooks/scroll';

export default function PostAside({ className, sections, ...props }: Props) {
  const [current, setCurrent] = useState('');
  const slugger = new GithubSlugger();

  const slugs = useMemo(
    () => sections.map((text) => [slugger.slug(text), text] as const),
    [sections], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useScrollFrame(() => {
    let [current] = slugs[0] ?? [''];

    for (const [id] of slugs) {
      const e = document.getElementById(id);
      if (!e) continue;

      const offset = Number.parseFloat(getComputedStyle(e).scrollMarginTop);
      const top = e.getBoundingClientRect().top;

      if (top <= offset) current = id;
    }

    setCurrent(current);
  }, [slugs]);

  function scrollTo(event?: MouseEvent<HTMLAnchorElement>, id?: string) {
    event?.preventDefault();

    if (id) {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const url = new URL(window.location.href);
    url.hash = id ?? '';
    window.history.pushState(null, '', url);
  }

  return (
    <aside
      {...props}
      className={cn(
        'border-l max-md:hidden font-display text-[13px] text-muted-foreground/80',
        className,
      )}
    >
      <div className="p-4 sticky top-15">
        <h4 className="mb-3">Sections</h4>

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
