'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { ComponentProps, ReactElement } from 'react';
import { ImageOffIcon } from 'lucide-react';
import type { ImageProps } from 'next/image';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils/cn';
import { useDelayedUnmount } from '@/lib/hooks/mount';
import Loader from '@/components/loader';

export default function ImageFrame({ children, className, ...props }: Props) {
  const src = children?.props.src;
  const ref = useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const indicator = useDelayedUnmount(status === 'loading', 300);

  if (!src && status !== 'error') {
    setStatus('error');
  } else if (src && status === 'error') {
    setStatus('ready');
  }

  const setSource = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node || !src) return;
      const { complete, naturalWidth } = node;
      setStatus(complete ? (naturalWidth > 0 ? 'ready' : 'error') : 'loading');
    },
    [src],
  );

  useLayoutEffect(() => setSource(ref.current), [setSource]);

  return (
    <div {...props} className={cn('relative bg-foreground/2 overflow-hidden', className)}>
      {children && src && status !== 'error' && (
        <ImageSlot
          ref={(node) => {
            ref.current = node;
            setSource(node);
          }}
          className={cn(
            'size-full object-cover shrink-0 opacity-0 transition-opacity duration-300',
            status === 'ready' && 'opacity-100',
          )}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
          sizes="auto, 100vw"
        >
          {children}
        </ImageSlot>
      )}
      {indicator && (
        <Loader
          className={cn(
            'absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2',
            'text-xl text-muted-foreground transition-opacity duration-300 opacity-0',
            status === 'loading' && 'opacity-100',
          )}
        />
      )}
      {(!src || status === 'error') && (
        <ImageOffIcon
          className={cn(
            'absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2',
            'text-muted-foreground',
          )}
        />
      )}
    </div>
  );
}

const ImageSlot = Slot.createSlot<HTMLImageElement, Omit<ImageProps, 'src' | 'alt'>>('ImageFrame');

interface Props extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactElement<ImageProps> | null;
}
