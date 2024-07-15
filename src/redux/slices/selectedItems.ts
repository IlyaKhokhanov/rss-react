import { createSlice } from '@reduxjs/toolkit';
import { ISelectedItem } from '../../types';

type selectedItemsState = {
  list: ISelectedItem[];
};

const initialState: selectedItemsState = {
  list: [],
};

const selectedItems = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setItem(state, action) {
      state.list = [...state.list, action.payload];
    },
    deleteItem(state, action) {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    deleteAllItems(state) {
      state.list = [];
    },
  },
});

export const { setItem, deleteItem, deleteAllItems } = selectedItems.actions;

export default selectedItems.reducer;
