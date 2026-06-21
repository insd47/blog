import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import type { ComponentType } from 'react';
import { parse, type Post, type PostMetadata } from './post';

const directory = path.join(process.cwd(), 'src/content/posts');
const dateFormatter = new Intl.DateTimeFormat('ko', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

type PostModule = {
  default: ComponentType;
  metadata: PostMetadata;
};

function assertSlug(slug: string) {
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) {
    throw new Error(`Invalid post slug: "${slug}"`);
  }
}

function byNewest(a: Post, b: Post) {
  return Date.parse(b.date) - Date.parse(a.date);
}

async function importPost(slug: string): Promise<PostModule> {
  assertSlug(slug);

  return import(`@/content/posts/${slug}/index.mdx`);
}

const slugs = cache(async () => {
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
});

const page = cache(async (slug: string) => {
  const post = await importPost(slug);

  return {
    post: parse(slug, post.metadata),
    Content: post.default,
  };
});

const list = cache(async () => {
  const all = await slugs();
  const items = await Promise.all(
    all.map(async (slug) => {
      const post = await importPost(slug);

      return parse(slug, post.metadata);
    }),
  );

  return items.sort(byNewest);
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(date));
}

export type { Post };
export const posts = { slugs, page, list, formatDate };
