export type PostMetadata = {
  title: string;
  description: string;
  date: string;
};

export type Post = PostMetadata & {
  slug: string;
};

function assertString(value: unknown, key: keyof PostMetadata, slug: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Post "${slug}" must define a non-empty "${key}" field.`);
  }
}

export function parse(slug: string, metadata: PostMetadata): Post {
  assertString(metadata.title, 'title', slug);
  assertString(metadata.description, 'description', slug);
  assertString(metadata.date, 'date', slug);

  if (Number.isNaN(Date.parse(metadata.date))) {
    throw new Error(`Post "${slug}" has an invalid "date" field.`);
  }

  return {
    ...metadata,
    slug,
  };
}
