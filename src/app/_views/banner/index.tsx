import { ComponentProps, Fragment } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './styles.module.css';

export default function BannerSection({ className, ...props }: ComponentProps<'section'>) {
  const stacks = ['Tauri', 'React', 'Unity', 'DevOps'];

  return (
    <section
      {...props}
      className={cn(
        'h-36 flex flex-center font-mono border-b select-none',
        styles.banner,
        className,
      )}
    >
      <p className="text-foreground/60 *:text-foreground *:font-normal text-center">
        <strong>황인성</strong> = (Software Engineer) ={'> '}
        {stacks.map((stack, index) => (
          <Fragment key={stack}>
            {index > 0 && ' + '}
            <strong>{stack}</strong>
          </Fragment>
        ))}
      </p>
    </section>
  );
}
