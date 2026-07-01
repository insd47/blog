'use client';

import { createContext, use, type ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

const Context = createContext(0);

export function OrderedList({ className, children, ...props }: ComponentProps<'ol'>) {
  const depth = use(Context);
  const styles = ['list-decimal', 'list-[lower-alpha]', 'list-[lower-roman]'];

  return (
    <Context value={depth + 1}>
      <ol className={cn('ms-5', styles[depth % styles.length], className)} {...props}>
        {children}
      </ol>
    </Context>
  );
}

export function UnorderedList({ className, children, ...props }: ComponentProps<'ul'>) {
  const depth = use(Context);
  const styles = ['list-disc', 'list-[circle]', 'list-[square]'];

  return (
    <Context value={depth + 1}>
      <ul className={cn('ms-5', styles[depth % styles.length], className)} {...props}>
        {children}
      </ul>
    </Context>
  );
}
