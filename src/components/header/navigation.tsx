'use client';

import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { useHeaderState } from '@/components/header/context';

export default function HeaderNavigation({ className, ...props }: ComponentProps<'nav'>) {
  const { point, offset } = useHeaderState();

  return (
    <nav
      {...props}
      className={cn(
        'px-6 gap-6 flex items-center text-[13px]',
        'font-display md:border-r md:bg-foreground/3',
        '*:text-foreground/60 *:hover:text-foreground *:transition-all',
        point &&
          offset > point &&
          'max-md:*:opacity-0 max-md:*:pointer-events-none max-md:*:-translate-y-6',
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

  return (
    <NextLink {...props} href={href} className={cn(active && 'text-foreground!', className)} />
  );
}
