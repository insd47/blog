import type { Metadata } from 'next';
import { getPostList } from '@/lib/content/posts';
import config from '@/lib/config';
import Banner from '@/components/banner';
import Separator from '@/components/separator';
import PostCard from '@/components/cards/post';

export default async function PostsPage() {
  const posts = await getPostList();

  return (
    <main>
      <Banner asChild>
        <header className="text-2xl flex flex-center px-6">
          <h1>Posts</h1>
        </header>
      </Banner>

      <Separator />

      {posts.map(({ slug, title, tags, thumbnail, published }) => (
        <PostCard
          key={slug}
          slug={slug}
          title={title}
          tags={tags}
          thumbnail={thumbnail}
          published={published}
        />
      ))}
    </main>
  );
}

export const metadata: Metadata = config.metadata.basic('Posts');
