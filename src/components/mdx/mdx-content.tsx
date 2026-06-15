import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';

type MdxContentProps = {
  source: string;
};

export async function MdxContent({ source }: MdxContentProps) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
  });

  return content;
}
