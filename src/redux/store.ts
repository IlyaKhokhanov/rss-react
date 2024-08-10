import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import application from './slices/application';
import selectedItems from './slices/selectedItems';
import { requestAPI } from './requestService';
import { createWrapper } from 'next-redux-wrapper';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  application,
  selectedItems,
  [requestAPI.reducerPath]: requestAPI.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(requestAPI.middleware),
  });
};

export const store = setupStore();
export const wrapper = createWrapper(setupStore, { debug: true });
