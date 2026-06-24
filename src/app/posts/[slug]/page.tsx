import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { base } from '@/lib/config/metadata';
import posts from '@/lib/content/posts';
import PostHeader from '@/app/posts/[slug]/_views/header';
import PostAside from '@/app/posts/[slug]/_views/aside';
import Separator from '@/components/separator';

export default async function PostPage({ params }: PageProps<'/posts/[slug]'>) {
  const { slug } = await params;
  const post = await posts.get(slug).catch(() => null);

  if (!post) notFound();

  const { title, tags, date, sections, Content } = post;

  return (
    <main>
      <article className="grid grid-cols-[minmax(0,1fr)_15rem] border-b">
        <PostHeader className="col-span-full" date={date} tags={tags} title={title} />
        <Separator className="col-span-full" />

        <div className="*:px-6 *:mb-4 text-[15px] py-8 text-muted-foreground">
          <Content />
        </div>

        <PostAside sections={sections} />
      </article>
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
