import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const config: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    qualities: [75, 95],
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
