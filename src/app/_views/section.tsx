import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export default function Section({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      {...props}
      className={cn(
        'border-b',
        '[&>header]:text-[13px] [&>header]:font-mono [&>header]:h-10',
        '[&>header]:text-muted-foreground [&>header]:bg-foreground/3 [&>header]:border-b',
        '[&>header>a]:text-foreground/60 [&>header>a]:hover:text-foreground [&>header>a]:transition-colors',
        '[&>header>a]:underline [&>header>a]:underline-offset-4',
        className,
      )}
    />
  );
}
