import { ComponentProps } from 'react';
import { readFile } from 'node:fs/promises';
import { getStaticPath } from '@/lib/opengraph/path';
import { OGArrayBufferImage } from '@/components/opengraph';

export async function Banner({ src, style, ...props }: ComponentProps<'img'>) {
  const path = getStaticPath(src as string);
  const file = await readFile(path);
  const buffer = Uint8Array.from(file).buffer;

  return (
    <OGArrayBufferImage
      {...props}
      src={buffer}
      style={{ width: '100%', height: 440, objectFit: 'cover', ...style }}
    />
  );
}

export async function Content({ style, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '38px 48px',
        borderTop: '2px solid #242424',
        ...style,
      }}
    />
  );
}
