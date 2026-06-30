import { ComponentProps } from 'react';
import { readFile } from 'node:fs/promises';
import { getStaticPath } from '@/lib/opengraph/path';
import { OGArrayBufferImage } from '@/components/opengraph';

export async function Thumbnail({ src, style, ...props }: ComponentProps<'img'>) {
  const path = getStaticPath(src as string);
  const file = await readFile(path);
  const buffer = Uint8Array.from(file).buffer;

  return (
    <OGArrayBufferImage
      {...props}
      src={buffer}
      style={{ width: 630, height: '100%', objectFit: 'cover', ...style }}
    />
  );
}

export function Content({ style, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      style={{
        flex: 1,
        padding: 48,
        borderLeft: '2px solid #242424',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    />
  );
}

export function Metadata({ style, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      style={{
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        ...style,
      }}
    />
  );
}
