import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export function Paragraph({ className, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={cn('font-sans first:mt-8 last:mb-8', className)} />;
}

export function Heading2({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className={cn(
        'mt-8 text-foreground font-bold scroll-m-20 pb-3 border-b text-xl leading-tight',
        className,
      )}
    />
  );
}

export function Heading3({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      {...props}
      className={cn('mt-6 text-foreground font-bold scroll-m-20 text-lg', className)}
    />
  );
}

export function Heading4({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h4
      {...props}
      className={cn('mt-6 text-foreground font-bold scroll-m-20 text-lg', className)}
    />
  );
}
