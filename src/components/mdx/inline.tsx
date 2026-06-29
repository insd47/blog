import { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export function Anchor({ className, href, ...props }: ComponentProps<'a'>) {
  const external = href?.startsWith('http') ?? false;

  return (
    <Link
      {...props}
      href={href ?? ''}
      className={cn(
        'underline underline-offset-4 decoration-[1.5px] transition-all',
        'decoration-foreground/20 hover:decoration-foreground/50',
        external && 'after:inline-block after:content-["↗"] after:text-foreground/50',
        className,
      )}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
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
