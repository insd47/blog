import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export default function Footer({
  className,
  ...props
}: ComponentProps<'footer'>) {
  return (
    <footer
      {...props}
      className={cn(
        'h-20 pt-4.5 font-mono text-center text-[13px] text-foreground/60',
        className,
      )}
    >
      2026 INSUNG HWANG
    </footer>
  );
}
