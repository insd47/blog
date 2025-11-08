import { ComponentProps } from 'react';
import { cn } from '@/lib/utilities/shadcn';

export function Code({ className, ...props }: ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...props}
    />
  );
}
