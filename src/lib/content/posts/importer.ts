import { ComponentType } from 'react';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';

export async function importSlugs() {
  const directory = path.join(process.cwd(), 'src/content/posts');
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

export async function importPost(slug: string) {
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) {
    throw new Error(`Invalid post slug: "${slug}"`);
  }

  const file = (await import(`@/content/posts/${slug}/post.mdx`)) as {
    default: ComponentType;
    metadata: unknown;
  };

  const metadata = scheme.parse(file.metadata);
  return { Markdown: file.default, ...metadata };
}

const scheme = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  date: z.date(),
});
