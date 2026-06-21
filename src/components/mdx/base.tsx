import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/shadcn';

export function Paragraph({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('my-4 leading-7', className)} {...props} />;
}

export function Anchor({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  );
}

export function Blockquote({ className, ...props }: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className={cn('my-6 border-l-2 pl-4 text-muted-foreground', className)}
      {...props}
    />
  );
}

export function Pre({ className, ...props }: ComponentProps<'pre'>) {
  return (
    <pre
      className={cn(
        'my-6 overflow-x-auto rounded-md border bg-muted p-4 text-sm',
        className,
      )}
      {...props}
    />
  );
}

export function HorizontalRule({ className, ...props }: ComponentProps<'hr'>) {
  return <hr className={cn('my-8 border-border', className)} {...props} />;
}
