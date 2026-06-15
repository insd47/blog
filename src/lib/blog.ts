import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const postFileExtensionPattern = /\.mdx?$/;

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  draft: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type PostWithContent = Post & {
  content: string;
};

type GetPostsOptions = {
  includeDrafts?: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(
  data: Record<string, unknown>,
  key: keyof PostFrontmatter,
  slug: string,
) {
  const value = data[key];

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Post "${slug}" must define a non-empty "${key}" field.`);
  }

  return value;
}

function readOptionalDate(
  data: Record<string, unknown>,
  key: 'publishedAt' | 'updatedAt',
  slug: string,
) {
  const value = data[key];

  if (value === undefined) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) {
    throw new Error(`Post "${slug}" has an invalid "${key}" date.`);
  }

  return value;
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): PostFrontmatter {
  const tags = data.tags;

  if (
    tags !== undefined &&
    (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string'))
  ) {
    throw new Error(`Post "${slug}" has an invalid "tags" field.`);
  }

  return {
    title: readString(data, 'title', slug),
    description: readString(data, 'description', slug),
    publishedAt: readOptionalDate(data, 'publishedAt', slug) ?? '',
    updatedAt: readOptionalDate(data, 'updatedAt', slug),
    tags: tags ?? [],
    draft: data.draft === true,
  };
}

function assertPublishedAt(post: PostFrontmatter, slug: string) {
  if (!post.publishedAt) {
    throw new Error(`Post "${slug}" must define a valid "publishedAt" date.`);
  }
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(postFileExtensionPattern, '');
}

function sortByPublishedAtDesc(a: Post, b: Post) {
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

function shouldIncludePost(post: Post, options?: GetPostsOptions) {
  const includeDrafts = options?.includeDrafts ?? process.env.NODE_ENV !== 'production';

  return includeDrafts || !post.draft;
}

async function getPostFileNames() {
  const fileNames = await readdir(postsDirectory);

  return fileNames.filter((fileName) => postFileExtensionPattern.test(fileName));
}

export const getPostSlugs = cache(async (options?: GetPostsOptions) => {
  const posts = await getAllPosts(options);

  return posts.map((post) => post.slug);
});

export const getPostBySlug = cache(async (slug: string): Promise<PostWithContent> => {
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) {
    throw new Error(`Invalid post slug: "${slug}"`);
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = await readFile(filePath, 'utf8');
  const parsed = matter(source);

  if (!isRecord(parsed.data)) {
    throw new Error(`Post "${slug}" has invalid frontmatter.`);
  }

  const frontmatter = normalizeFrontmatter(parsed.data, slug);
  assertPublishedAt(frontmatter, slug);

  const stats = readingTime(parsed.content);

  return {
    ...frontmatter,
    slug,
    content: parsed.content,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
  };
});

export const getAllPosts = cache(async (options?: GetPostsOptions): Promise<Post[]> => {
  const fileNames = await getPostFileNames();
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = getSlugFromFileName(fileName);
      const postWithContent = await getPostBySlug(slug);

      return {
        title: postWithContent.title,
        description: postWithContent.description,
        publishedAt: postWithContent.publishedAt,
        updatedAt: postWithContent.updatedAt,
        tags: postWithContent.tags,
        draft: postWithContent.draft,
        slug: postWithContent.slug,
        readingMinutes: postWithContent.readingMinutes,
      };
    }),
  );

  return posts.filter((post) => shouldIncludePost(post, options)).sort(sortByPublishedAtDesc);
});

export const getAllTags = cache(async () => {
  const posts = await getAllPosts({ includeDrafts: false });
  const tags = new Set(posts.flatMap((post) => post.tags));

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
});

export async function getAdjacentPosts(slug: string) {
  const posts = await getAllPosts({ includeDrafts: false });
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index >= 0 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined,
  };
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}
