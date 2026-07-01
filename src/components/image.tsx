'use client';

import { ComponentProps, ReactElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import { ImageOffIcon } from 'lucide-react';
import { ImageProps } from 'next/image';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils/cn';
import { useDelayedUnmount } from '@/lib/hooks/mount';
import Loader from '@/components/loader';

export default function ImageFrame({ children, className, ...props }: Props) {
  if (!children) throw new Error('ImageFrame must have <Image /> as a child');

  const ref = useRef<HTMLImageElement>(null);
  const src = children.props.src;
  const [status, setStatus] = useState<Status>('ready');
  const indicator = useDelayedUnmount(status === 'loading', 300);

  if (!src && status !== 'error') {
    setStatus('error');
  } else if (src && status === 'error') {
    setStatus('ready');
  }

  useEffect(() => {
    if (!ref.current?.complete) {
      setStatus('loading');
    }
  }, []);

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
      {status !== 'error' && (
        <ImageSlot
          ref={ref}
          className={cn(
            'size-full object-cover shrink-0 transition-opacity duration-300',
            status !== 'ready' && 'opacity-0',
          )}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
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

interface Props extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactElement<ImageProps> | null;
}
