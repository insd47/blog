import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { base } from '@/lib/config/metadata';
import PostHeader from '@/app/posts/[slug]/_views/header';
import PostAside from '@/app/posts/[slug]/_views/aside';
import Separator from '@/components/separator';
import HeaderSlot from '@/components/header/slot';
import { StickyNoteIcon } from 'lucide-react';
import { getPost, getPostList } from '@/lib/content/posts';

export default async function PostPage({ params }: PageProps<'/posts/[slug]'>) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);

  if (!post) notFound();

  const { title, tags, published, sections, Content } = post;

  return (
    <main>
      <HeaderSlot className="flex items-center gap-2 text-[13px] font-display">
        <StickyNoteIcon className="size-3.5 fill-muted shrink-0" />
        <p className="truncate">{title}</p>
      </HeaderSlot>

      <article className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_15rem] border-b break-keep">
        <PostHeader className="col-span-full" published={published} tags={tags} title={title} />
        <Separator className="col-span-full" />

        <div className="*:px-6 *:mb-5 pb-8 text-[15px] text-muted-foreground">
          <Content />
        </div>

        <PostAside sections={sections} />
      </article>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps<'/posts/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const { title, description, published, date } = await getPost(slug);

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
      publishedTime: published.toISOString(),
      modifiedTime: date?.toISOString(),
      authors: ['황인성'],
    },
  };
}

export async function generateStaticParams() {
  return getPostList().then((posts) => posts.map(({ slug }) => ({ slug })));
}

export const dynamicParams = false;
