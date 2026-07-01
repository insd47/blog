'use client';

import { ComponentProps } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import PostMetadata from '@/app/posts/[slug]/_views/metadata';
import ImageFrame from '@/components/image';

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
      className={cn('group flex border-b hover:bg-foreground/2 transition-colors box-content', className)}
    >
      <ImageFrame className="size-32.5 md:w-50 object-cover overflow-hidden shrink-0">
        <Image src={thumbnail} alt={title} sizes="auto" quality={75} />
      </ImageFrame>

      <div className="flex flex-1 flex-col border-l font-display p-4.5 justify-center">
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
