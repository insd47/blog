import type { MDXComponents } from 'mdx/types';
import { Heading1, Heading2, Heading3 } from '@/components/mdx/heading';
import { OrderedList, UnorderedList } from '@/components/mdx/list';
import { Code } from '@/components/mdx/code';
import {
  Anchor,
  Blockquote,
  HorizontalRule,
  Paragraph,
  Pre,
} from '@/components/mdx/base';

export const mdxComponents: MDXComponents = {
  a: Anchor,
  blockquote: Blockquote,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  hr: HorizontalRule,
  ul: UnorderedList,
  ol: OrderedList,
  p: Paragraph,
  pre: Pre,
  code: Code,
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
