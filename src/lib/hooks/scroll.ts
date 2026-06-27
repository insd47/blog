'use client';

import { DependencyList, useEffect } from 'react';
import { useFrame } from '@/lib/hooks/frame';

export function useScrollFrame(callback: () => void, deps?: DependencyList) {
  const [schedule, cancel] = useFrame(callback);

  useEffect(() => {
    callback();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancel();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
