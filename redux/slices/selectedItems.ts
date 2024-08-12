import { createSlice } from '@reduxjs/toolkit';
import { ISelectedItem } from '../../types';

type selectedItemsState = {
  selectedList: ISelectedItem[];
  openId: string;
};

const initialState: selectedItemsState = {
  selectedList: [],
  openId: '',
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
    setOpenId(state, action) {
      state.openId = action.payload;
    },
  },
});

export const { setItem, deleteItem, deleteAllItems, setOpenId } =
  selectedItems.actions;

export default selectedItems.reducer;
