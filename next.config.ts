import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const config: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: [
      'rehype-katex',
      'rehype-slug',
      ['@shikijs/rehype', { theme: 'github-dark-dimmed' }],
    ],
  },
});

export default withMDX(config);
