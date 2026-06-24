import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';


export default function PostAside({ className, ...props }: Props) {

  return (
    <aside {...props} className={cn("border-l", className)}>

    </aside>
  )
}

interface Props extends ComponentProps<'aside'> {

}