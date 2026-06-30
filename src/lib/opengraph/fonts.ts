import { cache } from 'react';
import type { ImageResponseOptions } from 'next/server';

export const getFonts = async (): Promise<FontOptions> => [
  {
    name: 'Pretendard',
    style: 'normal',
    weight: 400,
    data: await download(`${sources.pretendard}/Pretendard-Regular.otf`),
  },
  {
    name: 'Pretendard',
    style: 'normal',
    weight: 700,
    data: await download(`${sources.pretendard}/Pretendard-Bold.otf`),
  },
  {
    name: 'JetBrains Mono',
    style: 'normal',
    weight: 400,
    data: await download(`${sources.jetbrains}/JetBrainsMono-Regular.otf`),
  },
  {
    name: 'JetBrains Mono',
    style: 'normal',
    weight: 700,
    data: await download(`${sources.jetbrains}/JetBrainsMono-Bold.otf`),
  },
];

export type FontOptions = NonNullable<ImageResponseOptions['fonts']>;

const download = cache((src: string) =>
  fetch(`https://cdn.jsdelivr.net/gh/${src}`).then((res) => res.arrayBuffer()),
);

const sources = {
  pretendard: 'orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static',
  jetbrains: 'JetBrains/JetBrainsMono@v2.304/fonts/otf',
};
