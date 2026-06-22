import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export default function Header({
  className,
  ...props
}: ComponentProps<'header'>) {
  return (
    <header
      {...props}
      className={cn('border-b h-15 sticky top-0 z-50', className)}
    >
      insd
    </header>
  );
}
