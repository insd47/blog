import type { MDXComponents } from 'mdx/types';
import Separator from '@/components/separator';
import { Paragraph, Heading2, Heading3, Heading4 } from '@/components/mdx/typography';
import { Blockquote } from '@/components/mdx/blockquote';
import { Pre } from '@/components/mdx/fence';
import { OrderedList, UnorderedList } from '@/components/mdx/list';
import { Anchor, Code } from '@/components/mdx/inline';
import { Image } from '@/components/mdx/image';

export const mdxComponents: MDXComponents = {
  p: Paragraph,
  h1: () => null,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Paragraph,
  H6: Paragraph,
  hr: Separator,
  pre: Pre,
  code: Code,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  a: Anchor,
  img: Image,
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
