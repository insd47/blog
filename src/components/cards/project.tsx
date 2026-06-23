import { ComponentProps, Fragment } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export default function ProjectCard({ id, title, stacks, className, ...props }: Props) {
  return (
    <div {...props} className={cn('flex not-last:border-b', className)}>
      <div
        className={cn(
          'flex flex-col max-md:justify-center',
          'text-xs md:text-sm font-mono md:w-80 max-md:flex-1 py-4.5 px-4 border-r',
        )}
      >
        <h3 className="mb-1.5 text-sm md:text-lg">{title}</h3>
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
        className="flex-1 min-w-22.5 h-22.5 md:h-55 object-cover overflow-hidden"
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
