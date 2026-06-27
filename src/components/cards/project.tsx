import { ComponentProps, Fragment } from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export default function ProjectCard({ code, title, stacks, className, image, ...props }: Props) {
  return (
    <Link
      {...props}
      href={`/projects/${code}`}
      className={cn(
        'group flex border-b hover:bg-foreground/2 transition-colors',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col max-md:justify-center',
          'text-xs md:text-sm font-display md:w-80 max-md:flex-1 py-4.5 px-4 border-r',
        )}
      >
        <h3
          className={cn(
            'mb-1.5 text-sm md:text-lg',
            'underline underline-offset-4 decoration-transparent group-hover:decoration-foreground/30',
          )}
        >
          {title}
        </h3>
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
        src={image}
        alt={title}
        width={640}
        height={220}
      />
    </Link>
  );
}

interface Props extends ComponentProps<'a'> {
  code: string;
  title: string;
  stacks: string[];
  image: StaticImageData;
}
