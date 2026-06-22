import Link from 'next/link';
import { posts } from '@/lib/content/posts';

export default function Home() {
  return <HomePage />;
}

async function HomePage() {
  const recentPosts = (await posts.list()).slice(0, 5);

  return (
    <main>
      <div className="flex flex-col gap-6">
        {recentPosts.map((post) => (
          <article key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <h3 className="text-lg font-medium group-hover:underline group-hover:underline-offset-4">
                {post.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{post.description}</p>
            </Link>
            <time dateTime={post.date} className="mt-2 block text-sm text-muted-foreground">
              {posts.formatDate(post.date)}
            </time>
          </article>
        ))}
      </div>
    </main>
  );
}
