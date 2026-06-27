import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import { HeaderSlotPoint } from '@/components/header/slot';
import PostMetadata from '@/app/posts/[slug]/_views/metadata';

export default function PostHeader({ className, title, tags, published, ...props }: Props) {
  return (
    <HeaderSlotPoint asChild>
      <header {...props} className={cn('border-b px-6 py-7.5 font-display', className)}>
        <h1 className="text-2xl font-bold mb-3">{title}</h1>
        <PostMetadata tags={tags} published={published} />
      </header>
    </HeaderSlotPoint>
  );
}

interface Props extends ComponentProps<'header'> {
  title: string;
  tags: string[];
  published: Date;
}
