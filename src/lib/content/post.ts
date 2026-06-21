import type { StaticImageData } from 'next/image';

export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: StaticImageData;
};

export type Post = PostMetadata & {
  slug: string;
};

function assertString(value: unknown, key: keyof PostMetadata, slug: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Post "${slug}" must define a non-empty "${key}" field.`);
  }
}

function assertThumbnail(value: unknown, slug: string) {
  if (
    value !== undefined &&
    (typeof value !== 'object' ||
      value === null ||
      !('src' in value) ||
      typeof value.src !== 'string')
  ) {
    throw new Error(`Post "${slug}" has an invalid "thumbnail" field.`);
  }
}

export function parse(slug: string, metadata: PostMetadata): Post {
  assertString(metadata.title, 'title', slug);
  assertString(metadata.description, 'description', slug);
  assertString(metadata.date, 'date', slug);

  if (Number.isNaN(Date.parse(metadata.date))) {
    throw new Error(`Post "${slug}" has an invalid "date" field.`);
  }

  if (!Array.isArray(metadata.tags)) {
    throw new Error(`Post "${slug}" has an invalid "tags" field.`);
  }

  if (metadata.tags.some((tag) => typeof tag !== 'string')) {
    throw new Error(`Post "${slug}" has a non-string tag.`);
  }

  assertThumbnail(metadata.thumbnail, slug);

  return {
    ...metadata,
    slug,
  };
}
