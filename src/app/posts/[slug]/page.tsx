import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import * as meta from '@/lib/config/metadata';
import { posts } from '@/lib/content/posts';
import { PostArticle } from '../_components/post-article';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await posts.slugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { post } = await posts.page(slug);

    return meta.post(post);
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await posts.page(slug).catch(() => undefined);

  if (!data) {
    notFound();
  }

  const { post, Content } = data;

  return (
    <PostArticle post={post}>
      <Content />
    </PostArticle>
  );
}
