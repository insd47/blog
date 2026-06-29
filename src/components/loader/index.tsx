import { ComponentProps } from 'react';
import styles from './styles.module.css';
import { cn } from '@/lib/utils/cn';

export default function Loader({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.loader, className)} />;
}
