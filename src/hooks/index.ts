import { useLocation } from 'react-router-dom';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';

function useLocationPathname(): string {
  const { pathname } = useLocation();
  return pathname;
}

export type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;

export { useLocationPathname };
