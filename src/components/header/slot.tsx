'use client';

import { useHeaderActions, useHeaderState } from '@/components/header/context';
import { useEffect, useMemo, useState, type ComponentProps } from 'react';
import { Slot } from 'radix-ui';
import { isEmptyNode } from '@/lib/hooks/node';
import { useFrame } from '@/lib/hooks/frame';
import { mergeRefs } from '@/lib/utils/ref';
import { cn } from '@/lib/utils/cn';

/**
 * 스크롤 시 헤더에 표시될 컨텐츠입니다. 페이지 당 하나만 사용하여야 합니다.
 * @param asChild
 * @param children
 * @param props
 * @constructor
 */
export default function HeaderSlot({ asChild = false, children, ...props }: Props) {
  const { setSlot } = useHeaderActions();
  const Comp = asChild ? Slot.Root : 'div';

  const slot = useMemo(
    () => (!isEmptyNode(children) ? <Comp {...props}>{children}</Comp> : null),
    [Comp, children, props],
  );

  useEffect(() => {
    if (slot) {
      setSlot(slot);
      return () => setSlot((current) => (current === slot ? null : current));
    }
  }, [setSlot, slot]);

  return null;
}

/**
 * 이 Element를 지나면 HeaderSlot이 활성화됩니다. 페이지 당 하나만 사용하여야 합니다.
 * @param ref
 * @param asChild
 * @param props
 * @constructor
 */
export function HeaderSlotPoint({ asChild = false, ref, ...props }: Props) {
  const { setPoint } = useHeaderActions();
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const Comp = asChild ? Slot.Root : 'div';
  const mergedRef = useMemo(() => mergeRefs(setElement, ref), [ref]);

  const [schedule, cancel] = useFrame(() => {
    if (!element) return;

    const offset = Math.ceil(element.offsetTop + element.offsetHeight / 2 - 60);
    setPoint((current) => (current === offset ? current : offset));
  });

  useEffect(() => {
    if (!element) {
      return setPoint(null);
    }

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    observer.observe(document.body);

    return () => {
      cancel();
      observer.disconnect();
      setPoint(null);
    };
  }, [cancel, element, schedule, setPoint]);

  return <Comp ref={mergedRef} {...props} />;
}

/**
 * 헤더 슬롯의 실제 마운트 위치입니다.
 * @param className
 * @param props
 * @constructor
 */
export function HeaderSlotRoot({ className, ...props }: ComponentProps<'div'>) {
  const { slot, point, offset } = useHeaderState();
  if (!slot) return null;

  return (
    <Slot.Root
      {...props}
      className={cn(
        'pl-6 pr-15',
        'max-md:absolute max-md:left-16 max-md:right-0 max-md:top-1/2 max-md:-translate-y-1/2 transition-all',
        (!point || offset <= point) && 'opacity-0 pointer-events-none translate-y-6!',
        className,
      )}
    >
      {slot}
    </Slot.Root>
  );
}

interface Props extends ComponentProps<'div'> {
  asChild?: boolean;
}
