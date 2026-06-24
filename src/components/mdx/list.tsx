'use client';

import { createContext, use, type ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

const DepthContext = createContext(0);

export function OrderedList({ className, children, ...props }: ComponentProps<'ol'>) {
  const depth = use(DepthContext);
  const styles = ['list-decimal', 'list-[lower-alpha]', 'list-[lower-roman]'];

  return (
    <DepthContext value={depth + 1}>
      <ol className={cn('ms-5', styles[depth % styles.length], className)} {...props}>
        {children}
      </ol>
    </DepthContext>
  );
}

export function UnorderedList({ className, children, ...props }: ComponentProps<'ul'>) {
  const depth = use(DepthContext);
  const styles = ['list-disc', 'list-[circle]', 'list-[square]'];

  return (
    <DepthContext value={depth + 1}>
      <ul className={cn('ms-5', styles[depth % styles.length], className)} {...props}>
        {children}
      </ul>
    </DepthContext>
  );
}
