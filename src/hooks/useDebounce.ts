import { useRef, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );

  return debouncedFunc;
}
