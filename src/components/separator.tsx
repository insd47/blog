import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export default function Separator({
  className,
  ...props
}: ComponentProps<'hr'>) {
  return (
    <hr
      {...props}
      className={cn(
        'h-2 border-0 border-b border-border',
        '[--angle:120deg] [--color:rgb(255_255_255/0.08)] [--line:1px] [--gap:4px]',
        'bg-[repeating-linear-gradient(var(--angle),var(--color)_0_var(--line),transparent_var(--line)_var(--gap))]',
        className,
      )}
    />
  );
}
