'use client';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import application from './slices/application';
import selectedItems from './slices/selectedItems';
import { createWrapper } from 'next-redux-wrapper';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  application,
  selectedItems,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
export const wrapper = createWrapper(setupStore, { debug: true });
