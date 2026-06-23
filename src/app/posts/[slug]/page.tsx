import { notFound } from 'next/navigation';
import posts from '@/lib/content/posts';
import { Metadata } from 'next';
import { base } from '@/lib/config/metadata';

export default async function PostPage({ params }: PageProps<'/posts/[slug]'>) {
  const { slug } = await params;
  const post = await posts.get(slug).catch(() => null);

  if (!post) notFound();

  const { Markdown, ...metadata } = post;

  return (
    <main>
      <Markdown />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps<'/posts/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const { title, description, date } = await posts.get(slug);

  return {
    title,
    description,
    alternates: {
      ...base.alternates,
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      ...base.openGraph,
      type: 'article',
      title,
      description,
      url: `/posts/${slug}`,
      publishedTime: date.toISOString(),
      authors: ['황인성'],
    },
  };
}
