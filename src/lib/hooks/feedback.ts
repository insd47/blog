'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useFeedback<TCallback extends FeedbackCallback>(
  callback: TCallback,
  duration = 1000,
): readonly [action: TCallback, feedback: boolean] {
  const [feedback, setFeedback] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current === null) return;

    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const startFeedback = useCallback(() => {
    clearTimer();
    setFeedback(true);

    timerRef.current = window.setTimeout(() => {
      setFeedback(false);
      timerRef.current = null;
    }, duration);
  }, [clearTimer, duration]);

  const action = useCallback(
    (...args: Parameters<TCallback>): ReturnType<TCallback> => {
      const result = callback(...args) as ReturnType<TCallback>;

      if (isPromiseLike(result)) {
        void Promise.resolve(result).then(startFeedback, () => undefined);
        return result;
      }

      startFeedback();
      return result;
    },
    [callback, startFeedback],
  ) as TCallback;

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return [action, feedback] as const;
}

type FeedbackCallback = (...args: never[]) => unknown;

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  if ((typeof value !== 'object' && typeof value !== 'function') || value === null) {
    return false;
  }

  return 'then' in value && typeof value.then === 'function';
}
