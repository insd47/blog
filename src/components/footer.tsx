import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export default function Footer({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear();

  return (
    <footer
      {...props}
      className={cn(
        'flex max-xs:flex-col items-start gap-x-4 gap-y-1.25 h-26 xs:h-20 pt-4.5 px-5',
        'font-display text-[13px] text-foreground/60',
        className,
      )}
    >
      <p className="xs:flex-1">ⓒ {year} INSUNG HWANG</p>

      <div
        className={cn(
          'flex',
          '[&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-[1.5px] [&>a]:decoration-transparent',
          '[&>a]:hover:text-muted-foreground [&>a]:hover:decoration-foreground/30 [&>a]:transition-all',
          '*:not-first:before:content-["·"] *:not-first:before:mx-2 *:not-first:before:inline-block',
          '*:not-first:before:text-foreground/20!',
        )}
      >
        <Link href="/privacy">PRIVACY</Link>
        <Link href="/sbom.json">CREDITS</Link>
        <Link href="https://github.com/insd47/blog" target="_blank" rel="noopener noreferrer">
          SOURCE
        </Link>
      </div>
    </footer>
  );
}
