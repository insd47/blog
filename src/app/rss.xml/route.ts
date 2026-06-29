import config from '@/lib/config';
import { getPostList } from '@/lib/content/posts';
import { Feed } from 'feed';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getPostList();

  const feed = new Feed({
    title: '황인성',
    description: config.metadata.base.description!,
    id: config.metadata.url,
    link: config.metadata.url,
    language: 'ko',
    feed: config.metadata.url + '/rss.xml',
    updated: getLastModified(posts),
  });

  for (const post of posts) {
    feed.addItem({
      link: `${config.metadata.url}/posts/${post.slug}`,
      id: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      published: post.published,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

function getLastModified(items: { date: Date }[]) {
  return items.reduce<Date | undefined>((latest, item) => {
    if (!latest || item.date > latest) return item.date;
    return latest;
  }, undefined);
}
