import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './styles.module.css';

export default function Separator({
  className,
  ...props
}: ComponentProps<'hr'>) {
  return (
    <hr
      {...props}
      className={cn('h-2 border-0 border-b border-border', styles.separator, className)}
    />
  );
}
