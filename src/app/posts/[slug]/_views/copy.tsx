'use client';

import { ComponentProps, MouseEvent } from 'react';
import { useFeedback } from '@/lib/hooks/feedback';
import { cn } from '@/lib/utils/cn';
import { CheckIcon, LinkIcon } from 'lucide-react';

export default function PostCopyButton({ className, ...props }: ComponentProps<'button'>) {
  const [onClick, copied] = useFeedback(async (e: MouseEvent<HTMLButtonElement>) => {
    const { href } = window.location;
    await navigator.clipboard.writeText(href);
    props.onClick?.(e);
  });

  return (
    <button
      {...props}
      onClick={onClick}
      className={cn(
        'relative flex items-center text-xs gap-1.5',
        'underline underline-offset-4 decoration-[1.5px] transition-all',
        'decoration-transparent hover:decoration-foreground/30 text-muted-foreground/90',
        '[&>svg]:size-3 [&>svg]:transition-opacity',
        className,
      )}
    >
      <LinkIcon className={cn(copied && 'opacity-0')} />
      <CheckIcon className={cn('absolute text-green-500', !copied && 'opacity-0')} />
      Copy Link
    </button>
  );
}
