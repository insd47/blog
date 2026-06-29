import { useEffect, useState } from 'react';

/**
 * 컴포넌트의 조건부 Unmount 타이밍을 조절할 수 있는 hook입니다.
 * @param state boolean 상태
 * @param duration unmount duration
 */
export function useDelayedUnmount(state: boolean, duration: number) {
  const [mounted, setMounted] = useState(state);

  if (state && !mounted) setMounted(true);

  useEffect(() => {
    if (state) return;

    const timeout = setTimeout(() => setMounted(false), duration);
    return () => clearTimeout(timeout);
  }, [state, duration]);

  return mounted;
}
