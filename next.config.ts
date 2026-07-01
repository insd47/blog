import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const config: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 100],
    deviceSizes: [640, 720, 960, 1280, 1440, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 130, 200, 260, 400],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: [
      'rehype-katex',
      'rehype-slug',
      'rehype-unwrap-images',
      'rehype-mdx-import-media',
      '@insd47/rehype-fence',
    ],
  },
});

export default withMDX(config);
