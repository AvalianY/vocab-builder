import { useEffect, useState } from 'react';

export function useDebouncedValue(value, delay, onDebounce) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
      onDebounce?.(value);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, onDebounce, value]);

  return debouncedValue;
}
