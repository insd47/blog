import { ComponentProps, Fragment } from 'react';
import { cn } from '@/lib/utils/cn';
import { ClockIcon, TagIcon } from 'lucide-react';
import formatter from '@/lib/utils/formatter';

export default function PostMetadata({ tags, published, className, ...props }: Props) {
  return (
    <dl
      {...props}
      className={cn(
        'flex items-center text-muted-foreground/90 text-xs',
        '[&>dt]:mr-1.5 [&>dd]:mr-5 [&_svg]:size-3 [&_svg]:fill-muted',
        className,
      )}
    >
      <dt>
        <TagIcon /> <span className="sr-only">Tags</span>
      </dt>
      <dd>
        {tags.map((tag, i) => (
          <Fragment key={tag}>
            {i > 0 && <i className="text-muted-foreground/40 pr-0.5 mx-0.5">·</i>}
            <span className="text-center">{tag}</span>
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
  );
}

interface Props extends ComponentProps<'dl'> {
  tags: string[];
  published: Date;
}
