import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [value, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback<(value: T) => T>(
    (value) => {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      return value;
    },
    [key],
  );

  return { value, setValue } as const;
};

function useLocationPathname(): string {
  const { pathname } = useLocation();
  return pathname;
}

export { useLocalStorage, useLocationPathname };
