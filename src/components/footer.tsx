import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export default function Footer({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear();

  return (
    <footer
      {...props}
      className={cn('h-20 pt-4.5 font-display text-center text-[13px] text-foreground/60', className)}
    >
      {year} INSUNG HWANG
    </footer>
  );
}
