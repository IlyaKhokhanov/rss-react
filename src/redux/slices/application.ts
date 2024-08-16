import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../../data';
import { Item } from '../../utils/types';

interface IState {
  countries: string[];
  hookList: Item[];
  refList: Item[];
  base64: string;
  lastItem: string;
}

const initialState: IState = {
  countries: countryList,
  hookList: [],
  refList: [],
  base64: '',
  lastItem: '',
};

const catalogSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setHookList: (state, action) => {
      state.hookList.push(action.payload);
    },
    setRefList: (state, action) => {
      state.refList.push(action.payload);
    },
    setBase64: (state, action) => {
      state.base64 = action.payload;
    },
    setLastItem: (state, action) => {
      state.lastItem = action.payload;
    },
  },
});

export const { setHookList, setRefList, setBase64, setLastItem } =
  catalogSlice.actions;

export default catalogSlice.reducer;
