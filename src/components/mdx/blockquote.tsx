import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export function Blockquote({ className, ...props }: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      {...props}
      className={cn(
        'relative p-6 *:my-0! border-y bg-foreground/2',
        '[&::before,&::after]:absolute [&::before,&::after]:font-display [&::before,&::after]:text-xl',
        '[&::before,&::after]:h-4.25 [&::before,&::after]:pointer-events-none',
        'before:content-["“"] before:-top-2 before:left-4',
        'after:content-["”"] after:-bottom-2 after:right-4',
        className,
      )}
    />
  );
}
