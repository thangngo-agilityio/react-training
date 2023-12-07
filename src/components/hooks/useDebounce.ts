import { useState, useEffect } from 'react';


export function useDebounce<T>(value: T, delay?: number): T {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value)
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay])

  return debounce
}
