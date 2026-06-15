import type { Metadata } from 'next';
import Link from 'next/link';
import { formatPostDate, getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Posts',
  description: '블로그 글 목록입니다.',
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-normal">Posts</h1>
        <p className="mt-3 text-muted-foreground">
          MDX로 작성한 글을 최신순으로 보여줍니다.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8 last:border-b-0">
            <Link href={`/posts/${post.slug}`} className="group block">
              <h2 className="text-xl font-semibold group-hover:underline group-hover:underline-offset-4">
                {post.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{post.description}</p>
            </Link>

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
              <span>{post.readingMinutes}분</span>
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
