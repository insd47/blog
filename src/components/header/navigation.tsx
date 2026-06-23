'use client';

import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

export default function HeaderNavigation({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      {...props}
      className={cn(
        'px-6 gap-6 flex items-center text-[13px]',
        'font-mono md:border-r md:bg-foreground/3',
        '*:text-foreground/60 *:hover:text-foreground *:transition-colors',
        className,
      )}
    >
      <Link href="/">About</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
}

function Link({ href = '/', className, ...props }: ComponentProps<'a'>) {
  const pathname = usePathname();
  const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return <NextLink {...props} href={href} className={cn(active && 'text-foreground!', className)} />;
}
