import type { MDXComponents } from 'mdx/types';
import {
  Blockquote,
  Paragraph,
  Heading2,
  Heading3,
  Heading4,
} from '@/components/mdx/block';
import { Code, Pre } from '@/components/mdx/code';
import { OrderedList, UnorderedList } from '@/components/mdx/list';
import Separator from '@/components/separator';

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
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
