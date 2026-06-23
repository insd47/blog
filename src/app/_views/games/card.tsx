import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';
import Grainient from '@/components/grainient';

export default function GameCard({
  className,
  style,
  icon,
  title,
  rating,
  grade,
  colors,
  ...props
}: Props) {
  const percent = ((rating % grade.gap) / grade.gap) * 100;

  return (
    <div
      {...props}
      className={cn('relative flex flex-col p-5 font-mono', className)}
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

      <div className="flex md:mb-6 mb-3.5">
        <p className="md:text-4xl mr-3 text-foreground">{rating}</p>
        <p className="mt-0.75 text-xs text-foreground/60 max-sm:hidden">{grade.name}</p>
      </div>

      <div className="relative h-0.5 bg-foreground/30 mb-1">
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${percent}%`, backgroundColor: colors[0] }}
        />
      </div>
    </div>
  );
}

interface Props extends ComponentProps<'div'> {
  icon: ReactNode;
  title: string;
  rating: number;
  grade: { name: string; gap: number };
  colors: [string, string, string];
}
