import { ComponentProps, Fragment } from 'react';
import { cn } from '@/lib/utils/cn';
import { ClockIcon, TagIcon } from 'lucide-react';
import formatter from '@/lib/utils/formatter';
import { HeaderSlotPoint } from '@/components/header/slot';

export default function PostHeader({ className, title, tags, published, ...props }: Props) {
  return (
    <HeaderSlotPoint asChild>
      <header {...props} className={cn('border-b px-6 py-7.5 font-display', className)}>
        <h1 className="text-2xl font-bold mb-3">{title}</h1>

        <dl
          className={cn(
            'flex items-center text-muted-foreground/90 text-xs',
            '[&>dt]:mr-1.5 [&>dd]:mr-5 [&_svg]:size-3 [&_svg]:fill-muted',
          )}
        >
          <dt>
            <TagIcon /> <span className="sr-only">Tags</span>
          </dt>
          <dd>
            {tags.map((tag, i) => (
              <Fragment key={tag}>
                {i > 0 && <i className="text-muted-foreground/30"> · </i>}
                <span className="">{tag}</span>
              </Fragment>
            ))}
          </dd>

          <dt>
            <ClockIcon /> <span className="sr-only">Published</span>
          </dt>
          <dd>
            <time dateTime={published.toISOString()}>{formatter.date.format(published)}</time>
          </dd>
        </dl>
      </header>
    </HeaderSlotPoint>
  );
}

interface Props extends ComponentProps<'header'> {
  title: string;
  tags: string[];
  published: Date;
}
