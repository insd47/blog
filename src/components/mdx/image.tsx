'use client';

import { ComponentProps } from 'react';
import NextImage from 'next/image';
import ImageFrame from '@/components/image';
import { cn } from '@/lib/utils/cn';

export function Image({ src, alt, title, quality = 95, ...props }: ComponentProps<typeof NextImage>) {
  if (!src || typeof src === 'string') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={src} alt={alt} />;
  }

  if (!title) {
    return (
      <ImageFrame className="border-y -mt-px px-0!">
        <NextImage {...props} src={src} alt={alt} title={title} quality={quality} />
      </ImageFrame>
    );
  }

  return (
    <Figure>
      <ImageFrame className="border-y -mt-px">
        <NextImage {...props} src={src} alt={alt} title={title} quality={quality} />
      </ImageFrame>

      {title && <Figcaption>{title}</Figcaption>}
    </Figure>
  );
}

export function Figure({ className, ...props }: ComponentProps<'figure'>) {
  return <figure {...props} className={cn('px-0!', className)} />;
}

export function Figcaption({ className, ...props }: ComponentProps<'figcaption'>) {
  return (
    <figcaption
      {...props}
      className={cn('mt-4 mb-6 text-center text-xs text-muted-foreground/60', className)}
    />
  );
}
