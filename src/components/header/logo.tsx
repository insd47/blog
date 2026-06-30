import { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export default function HeaderLogo({ className, ...props }: ComponentProps<'a'>) {
  return (
    <Link
      {...props}
      href="/"
      className={cn('bg-background flex-center flex w-16 border-r', className)}
    >
      <Logo />
      <h1 className="sr-only">황인성</h1>
    </Link>
  );
}

export function Logo(props: ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 22H13V18H11V16H13V12H15V22ZM23 12C25.7614 12 28 14.2386 28 17C28 19.7614 25.7614 22 23 22C20.2386 22 18 19.7614 18 17C18 14.2386 20.2386 12 23 12ZM9.99609 18.792L8.58203 20.2061L4.99805 16.6221L1.41406 20.2061L0 18.792L4.99805 13.7939L9.99609 18.792ZM23 14C21.3431 14 20 15.3431 20 17C20 18.6569 21.3431 20 23 20C24.6569 20 26 18.6569 26 17C26 15.3431 24.6569 14 23 14ZM5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0ZM15 10H13V0H15V10ZM20 8H28V10H18V0H20V8ZM5 2C3.34315 2 2 3.34315 2 5C2 6.65685 3.34315 8 5 8C6.65685 8 8 6.65685 8 5C8 3.34315 6.65685 2 5 2Z" />
    </svg>
  );
}
