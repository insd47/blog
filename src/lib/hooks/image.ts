import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useImageStatus(src?: string | null) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<Status>('ready');

  const check = useCallback(
    (node: HTMLImageElement | null) => {
      ref.current = node;

      if (!src) {
        setStatus('error');
        return;
      }

      if (!node) return;
      setStatus(node.complete ? (node.naturalWidth > 0 ? 'ready' : 'error') : 'loading');
    },
    [src],
  );

  useLayoutEffect(() => {
    check(ref.current);
  }, [check]);

  return {
    status,
    ref: check,
    onLoad: () => setStatus('ready'),
    onError: () => setStatus('error'),
  };
}

type Status = 'loading' | 'ready' | 'error';
