'use client';

import { ComponentProps, ReactElement, SyntheticEvent, useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { ImageOffIcon } from 'lucide-react';
import { getImageProps, ImageProps } from 'next/image';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils/cn';
import Loader from '@/components/loader';
import { resolveCurrentSrc } from '@insd47/current-src';
import { useDelayedUnmount } from '@/lib/hooks/mount';

export default function ImageFrame({ children, className, ...props }: Props) {
  if (!children) throw new Error('ImageFrame must have <Image /> as a child');

  const src = children.props.src;
  const ref = useRef<HTMLImageElement | null>(null);

  const seen = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const { props } = getImageProps(children.props);

    const src = props.srcSet
      ? (resolveCurrentSrc(props.srcSet, props.sizes) ?? props.src)
      : props.src;

    const key = new URL(src, window.location.href).href;
    return sessionStorage.getItem(`ImageFrame:${key}`) === 'true';
  }, [children.props]);

  const [status, setStatus] = useState<Status>(hydrated && !seen ? 'loading' : 'ready');
  const indicator = useDelayedUnmount(status === 'loading', 300);

  useEffect(() => {
    if (!hydrated) hydrated = true;
    if (!ref.current?.complete) setStatus('loading');
  }, []);

  function onLoad({ currentTarget }: SyntheticEvent<HTMLImageElement>) {
    setStatus('ready');
    const key = new URL(currentTarget.currentSrc, window.location.href).href;
    sessionStorage.setItem(`ImageFrame:${key}`, 'true');
  }

  return (
    <div
      {...props}
      className={cn(
        'relative bg-foreground/2 overflow-hidden transition-colors duration-300',
        status === 'ready' && 'bg-background bg-noise',
        className,
      )}
    >
      {indicator && (
        <Loader
          className={cn(
            'absolute -z-1 left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2',
            'text-xl text-muted-foreground',
          )}
        />
      )}
      {src && status !== 'error' && (
        <ImageSlot
          ref={ref}
          className={cn(
            'size-full object-cover shrink-0 transition-opacity duration-300',
            status !== 'ready' && 'opacity-0',
          )}
          onLoad={onLoad}
          onError={() => setStatus('error')}
          loading={seen ? 'eager' : 'lazy'}
          decoding={seen ? 'sync' : 'async'}
          suppressHydrationWarning
        >
          {children}
        </ImageSlot>
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

type Status = 'loading' | 'ready' | 'error';
const ImageSlot = Slot.createSlot<HTMLImageElement, Omit<ImageProps, 'src' | 'alt'>>('ImageFrame');
let hydrated = false;

interface Props extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactElement<ImageProps> | null;
}
