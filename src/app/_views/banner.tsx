import { ComponentProps, Fragment } from 'react';
import { cn } from '@/lib/utils/cn';
import Banner from '@/components/banner';

export default function BannerSection({ className, ...props }: ComponentProps<'section'>) {
  const stacks = ['Tauri', 'React', 'Unity', 'DevOps'];

  return (
    <Banner {...props} className={cn('flex flex-center px-6', className)}>
      <p className="text-foreground/60 *:text-foreground *:font-normal text-center text-pretty">
        <strong>황인성</strong> = (Software Engineer) ={'> '}
        {stacks.map((stack, index) => (
          <Fragment key={stack}>
            {index > 0 && ' + '}
            <strong>{stack}</strong>
          </Fragment>
        ))}
      </p>
    </Banner>
  );
}
