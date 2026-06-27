import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export function Pre({ className, ...props }: ComponentProps<'pre'>) {
  return (
    <pre
      {...props}
      className={cn(
        'overflow-x-auto p-6 border-y bg-foreground/2 leading-none',
        '*:text-[13px] *:bg-transparent *:p-0',
        className,
      )}
    />
  );
}
