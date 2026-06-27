import config from '@/lib/config';
import { getPostList } from '@/lib/content/posts';
import { Feed } from 'feed';

export async function GET() {
  const feed = new Feed({
    title: '황인성',
    description: config.metadata.base.description!,
    id: config.metadata.url,
    link: config.metadata.url,
    language: 'ko',
    feed: config.metadata.url + '/rss.xml',
  });

  for (const post of await getPostList()) {
    const url = `${config.metadata.url}/posts/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      publishedAt: post.date,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
