import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import application from './slices/application';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  application,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
