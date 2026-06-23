import posts from '@/lib/content/posts';
import config from '@/lib/config';
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

  for (const post of await posts.list()) {
    const url = `${config.metadata.url}/posts/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: post.date,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
