import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export default function Section({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      {...props}
      className={cn(
        'border-b',
        '[&>header]:text-[13px] [&>header]:font-display [&>header]:h-10',
        '[&>header]:text-foreground/60 [&>header]:bg-foreground/3 [&>header]:border-b',
        '[&>header>a]:hover:text-foreground [&>header>a]:transition-colors',
        '[&>header>a]:*:underline [&>header>a]:*:underline-offset-4',
        '[&>header>a]:*:decoration-border [&>header>a]:hover:*:decoration-foreground/30',
        className,
      )}
    />
  );
}
