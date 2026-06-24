import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

export function Pre({ className, ...props }: ComponentProps<'pre'>) {
  return <pre {...props} className={cn('overflow-x-auto', className)} />;
}

export function Code({ className, ...props }: ComponentProps<'code'>) {
  return <code {...props} className={cn('font-mono', className)} />;
}
