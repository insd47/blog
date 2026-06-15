# Blog

Next.js App Router blog boilerplate with shadcn/ui and MDX.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn/ui b0 preset
- `@next/mdx`
- `next-mdx-remote`
- `gray-matter`

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Content

Posts live in `content/posts/*.mdx`.

```mdx
---
title: "Post title"
description: "Short description for lists and metadata"
publishedAt: "2026-06-14"
updatedAt: "2026-06-14"
tags:
  - Next.js
draft: false
---

Post body...
```

- `draft: true` posts are excluded from production routes, RSS, and sitemap.
- Slugs come from file names, for example `content/posts/hello.mdx` becomes `/posts/hello`.
- Shared MDX components live in `src/mdx-components.tsx`.
- Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, RSS, and sitemap use the deployed domain.

## Routes

- `/` shows recent posts.
- `/posts` shows all posts.
- `/posts/[slug]` renders one MDX post.
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` are generated from MDX metadata.
