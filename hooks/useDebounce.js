import { useEffect, useState } from 'react';

/**
 * Return a debounced value after a wait interval.
 * @template T
 * @param {T} value
 * @param {number} delay
 * @returns {T}
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};


