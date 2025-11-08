import type { MDXComponents } from 'mdx/types';
import { Heading1, Heading2, Heading3 } from '@/components/mdx/heading';
import { OrderedList, UnorderedList } from '@/components/mdx/list';
import { Code } from '@/components/mdx/code';

const components: MDXComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  ul: UnorderedList,
  ol: OrderedList,
  code: Code,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
