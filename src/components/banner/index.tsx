import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './styles.module.css';
import { Slot } from 'radix-ui';

export default function Banner({ className, asChild, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'section';

  return (
    <Comp
      {...props}
      className={cn('h-36 font-display select-none border-b', styles.banner, className)}
    />
  );
}

interface Props extends ComponentProps<'section'> {
  asChild?: boolean;
}
