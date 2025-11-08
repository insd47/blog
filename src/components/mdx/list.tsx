import { ComponentProps } from 'react';
import { cn } from '@/lib/utilities/shadcn';

export function UnorderedList({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('my-4 ml-6 list-disc [&>li]:not-last:mb-1', className)}
      {...props}
    />
  );
}

export function OrderedList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      className={cn('my-4 ml-6 list-decimal [&>li]:not-last:mb-1', className)}
      {...props}
    />
  );
}