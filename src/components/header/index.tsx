import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import HeaderLogo from '@/components/header/logo';
import HeaderNavigation from '@/components/header/navigation';
import HeaderGithub from '@/components/header/github';
import { HeaderSlotRoot } from '@/components/header/slot';

export default function Header({ className, ...props }: ComponentProps<'header'>) {
  return (
    <header
      {...props}
      className={cn(
        'flex border-b bg-noise h-15 sticky top-0 z-50',
        'before:absolute before:inset-0 before:-z-1 before:bg-foreground/3 md:before:opacity-0',
        className,
      )}
    >
      <HeaderLogo />
      <HeaderNavigation />
      <HeaderSlotRoot />
      <HeaderGithub />
    </header>
  );
}
