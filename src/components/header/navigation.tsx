import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export default function HeaderNavigation({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      {...props}
      className={cn(
        'px-6 gap-6 flex items-center text-[13px]',
        'font-mono border-r bg-foreground/3',
        '*:text-muted-foreground *:hover:text-foreground *:transition-colors',
        className,
      )}
    >
      <Link href="/">About</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
}
