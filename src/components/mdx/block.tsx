import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export function Paragraph({ className, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={className} />;
}

export function Heading2({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className={cn(
        'mt-8 text-foreground scroll-m-20 pb-3 border-b text-xl font-bold font-mono leading-tight first:mt-0',
        className,
      )}
    />
  );
}

export function Heading3({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 {...props} className={cn('mt-8 scroll-m-20 text-lg font-bold', className)} />;
}

export function Heading4({ className, ...props }: ComponentProps<'h3'>) {
  return <h4 {...props} className={cn('mt-8 scroll-m-20 text-lg font-bold', className)} />;
}

export function Blockquote({ className, ...props }: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      {...props}
      className={cn('border-l-2 border-accent pl-4 text-muted-foreground', className)}
    />
  );
}
