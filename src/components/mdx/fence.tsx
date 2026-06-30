'use client';

import { ComponentProps, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useFeedback } from '@/lib/hooks/feedback';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { resolveFileIcon } from '@insd47/ide-file-icons';
import Image from 'next/image';

export function Pre({ className, title, ...props }: ComponentProps<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  const icon = title ? resolveFileIcon(title, 'dark') : null;

  const [onClick, copied] = useFeedback(async () => {
    if (ref.current) {
      await navigator.clipboard.writeText(ref.current.textContent);
    }
  });

  return (
    <figure className="relative p-0! bg-foreground/1 text-[13px] border-y">
      {title && (
        <figcaption className="bg-foreground/2 h-9 gap-1 flex items-center px-5 border-b">
          <Image
            unoptimized
            src={`https://intellij-icons.jetbrains.design/icons/${icon}`}
            alt="file icon"
            width={16}
            height={16}
          />
          {title}
        </figcaption>
      )}

      <button
        className={cn(
          'absolute flex flex-center top-1.75 right-2.25 size-5',
          ' *:size-3.5 *:transition-[color,opacity] *:text-foreground/60 hover:*:text-foreground',
        )}
        onClick={onClick}
      >
        <CopyIcon className={cn(copied && 'opacity-0')} />
        <CheckIcon className={cn('absolute text-green-500!', !copied && 'opacity-0')} />
      </button>

      <pre
        {...props}
        ref={ref}
        className={cn(
          'overflow-x-auto p-6 leading-none',
          '*:text-[13px] *:bg-transparent *:p-0',
          className,
        )}
      />
    </figure>
  );
}
