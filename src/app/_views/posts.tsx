import { getPostList } from '@/lib/content/posts';
import Section from '@/app/_views/section';
import Link from 'next/link';
import PostCard from '@/components/cards/post';

export default async function PostSection() {
  const posts = await getPostList();

  return (
    <Section>
      <header>
        <Link className="h-full px-4 flex items-center gap-2.5" href="/posts">
          <h2>Posts</h2>
          <p className="no-underline! text-foreground/60">={'>'}</p>
        </Link>
      </header>
      {posts.slice(0, 3).map(({ slug, title, tags, published, image }) => (
        <PostCard
          key={slug}
          className="last:border-0"
          slug={slug}
          title={title}
          tags={tags}
          published={published}
          image={image}
        />
      ))}
    </Section>
  );
}
