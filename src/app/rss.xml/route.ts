import { getSiteUrl, siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/blog';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const posts = await getAllPosts({ includeDrafts: false });

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/posts/${post.slug}`;

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <description>${escapeXml(post.description)}</description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <description>${escapeXml(siteConfig.description)}</description>
        <link>${siteUrl}</link>
        <language>ko</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
