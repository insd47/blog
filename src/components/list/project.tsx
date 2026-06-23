import { ComponentProps, Fragment } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export default function ProjectCard({ id, title, stacks, className, ...props }: Props) {
  return (
    <div {...props} className={cn('flex not-last:border-b', className)}>
      <div className="text-sm font-mono w-80 py-4.5 px-4">
        <h3 className="mb-1.5 text-lg">{title}</h3>
        <p className="text-muted-foreground/60 *:text-muted-foreground *:font-normal">
          {stacks.map((stack, index) => (
            <Fragment key={stack}>
              {index > 0 && ' + '}
              <strong>{stack}</strong>
            </Fragment>
          ))}
        </p>
      </div>

      <Image
        className="flex-1 h-55"
        src={`/projects/${id}.png`}
        alt={title}
        width={640}
        height={220}
      />
    </div>
  );
}

interface Props extends ComponentProps<'div'> {
  id: string;
  title: string;
  stacks: string[];
}
