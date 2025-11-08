import { ComponentProps } from 'react';
import { cn } from '@/lib/utilities/shadcn';

export function UnorderedList({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      {...props}
    />
  );
}

export function OrderedList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
      {...props}
    />
  );
}
