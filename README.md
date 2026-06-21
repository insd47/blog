# Blog

Next.js App Router blog boilerplate with shadcn/ui and MDX.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn/ui b0 preset
- `@next/mdx`

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Content

Posts live under `src/content/posts/<slug>/index.mdx`.

```mdx
import thumbnail from './thumbnail.png';

export const metadata = {
  title: 'Post title',
  description: 'Short post description',
  date: '2026-06-14',
  tags: ['Next.js'],
  thumbnail,
};

Post body...
```

- Shared MDX components live in `src/mdx-components.tsx`.
- Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, RSS, and sitemap use the deployed domain.

## Routes

- `/` shows recent posts.
- `/posts` shows all posts.
- `/posts/<slug>` imports `src/content/posts/<slug>/index.mdx`.
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` are generated from MDX metadata.
