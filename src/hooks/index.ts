import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';

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

export type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;

export { useLocalStorage, useLocationPathname };
