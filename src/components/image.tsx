'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentProps, ReactElement } from 'react';
import { ImageOffIcon } from 'lucide-react';
import { getImageProps, ImageProps } from 'next/image';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils/cn';
import { useDelayedUnmount } from '@/lib/hooks/mount';
import Loader from '@/components/loader';

export default function ImageFrame({ children, className, ...props }: Props) {
  if (!children) throw new Error('ImageFrame must have a child');

  const src = children.props.src;
  const ref = useRef<HTMLImageElement | null>(null);

  const cached = useMemo(() => {
    if (!hydrated) return false;
    if (typeof window === 'undefined') return true;
    const { props } = getImageProps(children.props);

    if (props.srcSet) {
      return props.srcSet
        .split(',')
        .map((c) => c.trim().split(/\s+/, 1)[0])
        .map((url) => new URL(url, location.href).href)
        .some((url) => performance.getEntriesByName(url, 'resource').length > 0);
    }

    return false;
  }, [children]);

  const [status, setStatus] = useState<Status>(hydrated && !cached ? 'loading' : 'ready');
  const indicator = useDelayedUnmount(status === 'loading', 300);

  useEffect(() => {
    if (!hydrated) hydrated = true;
  }, []);

  if (!src && status !== 'error') {
    setStatus('error');
  } else if (src && status === 'error') {
    setStatus('ready');
  }

  return (
    <div
      {...props}
      className={cn(
        'relative bg-foreground/2 overflow-hidden transition-colors duration-300',
        status === 'ready' && 'bg-background bg-noise',
        className,
      )}
      suppressHydrationWarning
    >
      <Loader
        className={cn(
          'absolute -z-1 left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2',
          'text-xl text-muted-foreground',
          !indicator && 'hidden',
        )}
      />
      {status !== 'error' && (
        <ImageSlot
          ref={ref}
          className={cn(
            'size-full object-cover shrink-0 transition-opacity duration-300',
            status !== 'ready' && 'opacity-0',
          )}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
          preload={cached}
          decoding={cached ? 'sync' : 'async'}
        >
          {children}
        </ImageSlot>
      )}
      {status === 'error' && (
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

type Status = 'loading' | 'ready' | 'error';
const ImageSlot = Slot.createSlot<HTMLImageElement, Omit<ImageProps, 'src' | 'alt'>>('ImageFrame');
let hydrated = false;

interface Props extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactElement<ImageProps> | null;
}
