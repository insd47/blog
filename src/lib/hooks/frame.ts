'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useFrame(callback: FrameRequestCallback) {
  const callbackRef = useRef(callback);
  const frameRef = useRef(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
  }, []);

  const schedule = useCallback(() => {
    cancel();
    frameRef.current = requestAnimationFrame((time) => {
      callbackRef.current(time);
    });
  }, [cancel]);

  return [schedule, cancel] as const;
}
