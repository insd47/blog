import { ComponentProps } from 'react';
import { cn } from '@/lib/utilities/shadcn';

export function Heading1({
  children,
  className,
  ...props
}: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Heading2({
  children,
  className,
  ...props
}: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Heading3({
  children,
  className,
  ...props
}: ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
