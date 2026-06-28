import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';
import Grainient from '@/components/grainient';

export default function GameCard({
  className,
  style,
  icon,
  title,
  name = 'INSD',
  rating,
  min,
  max,
  grade,
  colors,
  ...props
}: Props) {
  const percent = Math.max(0, Math.min(100, ((rating - min) / (max - min)) * 100));

  return (
    <div
      {...props}
      className={cn('relative flex flex-col p-5 font-display', className)}
      style={{ color: colors[0], ...style }}
    >
      <Grainient
        className="absolute inset-0 -z-1 opacity-20"
        zoom={1.2}
        blendSoftness={0.4}
        color1={colors[0]}
        color2={colors[1]}
        color3={colors[2]}
      />

      <div className="flex items-center *:mr-2 md:mb-2.5 mb-1.5 text-sm">
        {icon} <span className="max-sm:hidden">{title}</span>
      </div>

      <p className="md:text-2xl mb-3 text-foreground">{name}</p>

      <div className="relative h-0.5 bg-foreground/30 mb-2.5">
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${percent}%`, backgroundColor: colors[0] }}
        />
      </div>

      <div className="flex items-center text-foreground/60 text-xs">
        {grade && <p className="max-md:hidden uppercase">{grade}</p>}
        {grade && <p className="max-md:hidden mx-1 text-foreground/40">·</p>}
        <p>{rating}</p>
        <p className="flex-1 max-sm:hidden" />
        <p className="max-sm:hidden">{'=> ' + max}</p>
      </div>
    </div>
  );
}

interface Props extends ComponentProps<'div'> {
  icon: ReactNode;
  title: string;
  name?: string;
  rating: number;
  min: number;
  max: number;
  grade?: string;
  colors: [string, string, string];
}
