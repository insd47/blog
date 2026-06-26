import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export function Pre({ className, ...props }: ComponentProps<'pre'>) {
  return (
    <pre
      {...props}
      className={cn(
        'overflow-x-auto p-6 border-y bg-foreground/2!',
        '*:text-[13px] *:bg-transparent *:p-0',
        className,
      )}
    />
  );
}

export function Code({ className, ...props }: ComponentProps<'code'>) {
  return (
    <code
      {...props}
      className={cn('font-mono text-sm px-1 py-px rounded-sm bg-muted/50', className)}
    />
  );
}
