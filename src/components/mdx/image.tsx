'use client';

import { ComponentProps } from 'react';
import NextImage from 'next/image';
import ImageFrame from '@/components/image';

export function Image({ src, alt, title, ...props }: ComponentProps<typeof NextImage>) {
  if (!src || typeof src === 'string') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={src} alt={alt} />;
  }

  if (!title) {
    return (
      <ImageFrame className="border-b px-0!">
        <NextImage {...props} src={src} alt={alt} title={title} />
      </ImageFrame>
    );
  }

  return (
    <figure className="px-0!">
      <ImageFrame className="border-b">
        <NextImage {...props} src={src} alt={alt} title={title} />
      </ImageFrame>

      {title && (
        <figcaption className="mt-4 mb-6 text-center text-xs text-muted-foreground/60">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
