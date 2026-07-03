import { ComponentProps } from 'react';
import { readFile } from 'node:fs/promises';
import { getPublicPath } from '@/lib/opengraph/path';
import { Logo } from '@/components/header/logo';

export async function SatoriRoot({ style, children, ...props }: ComponentProps<'div'>) {
  const file = await readFile(getPublicPath('/opengraph/noise.png'));
  const noise = Uint8Array.from(file).buffer;

  return (
    <div
      {...props}
      style={{
        color: 'white',
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        fontFamily: '"JetBrains Mono", Pretendard',
        ...style,
      }}
    >
      <SatoriArrayBufferImage src={noise} style={{ position: 'absolute', inset: 0 }} />
      {children}
    </div>
  );
}

export function SatoriTitle({ style, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      style={{
        fontSize: 54,
        fontWeight: 700,
        wordBreak: 'keep-all',
        margin: 0,
        padding: 0,
        ...style,
      }}
    />
  );
}

export function SatoriParagraph({ style, ...props }: ComponentProps<'p'>) {
  return (
    <p {...props} style={{ margin: 0, padding: 0, fontSize: 18, color: '#C1C1C1', ...style }} />
  );
}

export async function SatoriJoin({ style, ...props }: ComponentProps<'span'>) {
  return <span {...props} style={{ color: '#C1C1C199', ...style }} />;
}

export function SatoriLogo({ style, ...props }: ComponentProps<'svg'>) {
  return (
    <Logo
      {...props}
      style={{ position: 'absolute', bottom: 48, right: 48, width: 56, height: 44, ...style }}
    />
  );
}

export function SatoriArrayBufferImage({ src, alt, ...props }: ArrayBufferImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={src as unknown as string} alt={alt} />;
}

interface ArrayBufferImageProps extends Omit<ComponentProps<'img'>, 'src'> {
  src: ArrayBuffer;
}
