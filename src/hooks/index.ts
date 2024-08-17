import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';

export type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
