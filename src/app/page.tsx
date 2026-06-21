import Link from 'next/link';
import { posts } from '@/lib/content/posts';

export default function Home() {
  return <HomePage />;
}

async function HomePage() {
  const recentPosts = (await posts.list()).slice(0, 5);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-semibold tracking-normal">insd blog</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          생각과 작업 기록을 MDX로 남깁니다.
        </p>
      </header>

      <section>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link
            href="/posts"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            전체 보기
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {recentPosts.map((post) => (
            <article key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="group block">
                <h3 className="text-lg font-medium group-hover:underline group-hover:underline-offset-4">
                  {post.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {post.description}
                </p>
              </Link>
              <time
                dateTime={post.date}
                className="mt-2 block text-sm text-muted-foreground"
              >
                {posts.formatDate(post.date)}
              </time>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
