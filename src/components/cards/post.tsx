import { ComponentProps } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import PostMetadata from '@/app/posts/[slug]/_views/metadata';

export default function PostCard({
  slug,
  tags,
  title,
  thumbnail,
  published,
  className,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      href={`/posts/${slug}`}
      className={cn('group flex border-b hover:bg-foreground/2 transition-colors', className)}
    >
      <Image
        className="size-32.5 border-r md:w-50 object-cover overflow-hidden shrink-0"
        src={thumbnail}
        alt={title}
      />

      <div className="flex flex-1 flex-col font-display p-4.5 justify-center">
        <h3
          className={cn(
            'mb-2.5 text-base transition-all line-clamp-2',
            'underline underline-offset-4 decoration-transparent group-hover:decoration-foreground/30',
          )}
        >
          {title}
        </h3>

        <PostMetadata tags={tags} published={published} />
      </div>
    </Link>
  );
}

interface Props extends ComponentProps<'a'> {
  slug: string;
  title: string;
  tags: string[];
  published: Date;
  thumbnail: StaticImageData;
}
