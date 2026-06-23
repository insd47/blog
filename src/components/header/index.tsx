import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import HeaderLogo from '@/components/header/logo';
import HeaderNavigation from '@/components/header/navigation';
import HeaderGithub from '@/components/header/github';

export default function Header({
  className,
  ...props
}: ComponentProps<'header'>) {
  return (
    <header
      {...props}
      className={cn('flex border-b bg-noise h-15 sticky top-0 z-50', className)}
    >
      <HeaderLogo />
      <HeaderNavigation />
      <HeaderGithub />
    </header>
  );
}
