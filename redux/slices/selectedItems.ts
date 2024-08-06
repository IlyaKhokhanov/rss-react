import { createSlice } from '@reduxjs/toolkit';
import { ISelectedItem } from '../../types';

type selectedItemsState = {
  selectedList: ISelectedItem[];
};

const initialState: selectedItemsState = {
  selectedList: [],
};

const selectedItems = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setItem(state, action) {
      state.selectedList = [...state.selectedList, action.payload];
    },
    deleteItem(state, action) {
      state.selectedList = state.selectedList.filter(
        (el) => el.id !== action.payload,
      );
    },
    deleteAllItems(state) {
      state.selectedList = [];
    },
  },
});

export const { setItem, deleteItem, deleteAllItems } = selectedItems.actions;

export default selectedItems.reducer;
