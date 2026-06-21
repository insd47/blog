import type { ReactNode } from 'react';
import { posts, type Post } from '@/lib/content/posts';

type PostArticleProps = {
  post: Post;
  children: ReactNode;
};

export function PostArticle({ post, children }: PostArticleProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <article>
        <header className="mb-10 border-b pb-8">
          <h1 className="text-4xl font-semibold tracking-normal text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={post.date}>{posts.formatDate(post.date)}</time>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </header>

        {children}
      </article>
    </main>
  );
}
