import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdxContent } from '@/components/mdx/mdx-content';
import { getSiteUrl, siteConfig } from '@/config/site';
import {
  formatPostDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from '@/lib/blog';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts({ includeDrafts: false });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    const url = `${getSiteUrl()}/posts/${post.slug}`;

    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: url,
        types: {
          'application/rss+xml': '/rss.xml',
        },
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        url,
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [siteConfig.author.name],
        tags: post.tags,
      },
    };
  } catch {
    return {};
  }
}

async function getPostPageData(slug: string) {
  try {
    const post = await getPostBySlug(slug);

    if (post.draft && process.env.NODE_ENV === 'production') {
      return undefined;
    }

    const adjacentPosts = await getAdjacentPosts(post.slug);

    return { post, adjacentPosts };
  } catch {
    return undefined;
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPostPageData(slug);

  if (!data) {
    notFound();
  }

  const { post, adjacentPosts } = data;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <Link
        href="/posts"
        className="mb-8 text-sm text-muted-foreground hover:text-foreground"
      >
        Posts
      </Link>

      <article>
        <header className="mb-10 border-b pb-8">
          <h1 className="text-4xl font-semibold tracking-normal text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {formatPostDate(post.publishedAt)}
            </time>
            <span>{post.readingMinutes}분</span>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </header>

        <MdxContent source={post.content} />
      </article>

      <nav className="mt-14 grid gap-4 border-t pt-8 sm:grid-cols-2">
        {adjacentPosts.previous ? (
          <Link
            href={`/posts/${adjacentPosts.previous.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            이전 글
            <span className="mt-1 block text-base font-medium text-foreground">
              {adjacentPosts.previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {adjacentPosts.next ? (
          <Link
            href={`/posts/${adjacentPosts.next.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground sm:text-right"
          >
            다음 글
            <span className="mt-1 block text-base font-medium text-foreground">
              {adjacentPosts.next.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
