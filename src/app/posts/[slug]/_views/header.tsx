import { ComponentProps, Fragment } from 'react';
import { cn } from '@/lib/utils/cn';
import { ClockIcon, TagIcon } from 'lucide-react';
import formatter from '@/lib/utils/formatter';

export default function PostHeader({ className, title, tags, date, ...props }: Props) {
  return (
    <header {...props} className={cn('border-b px-6 py-7.5 font-mono', className)}>
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
          <time dateTime={date.toISOString()}>{formatter.date.format(date)}</time>
        </dd>
      </dl>
    </header>
  );
}

interface Props extends ComponentProps<'header'> {
  title: string;
  tags: string[];
  date: Date;
}
