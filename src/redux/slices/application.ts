import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../../data';

type Item = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  picture: string;
  country: string;
  terms: boolean;
};

interface IState {
  countries: string[];
  hookList: Item[];
  refList: Item[];
  base64: string;
}

const initialState: IState = {
  countries: countryList,
  hookList: [],
  refList: [],
  base64: '',
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
  },
});

export const { setHookList, setRefList, setBase64 } = catalogSlice.actions;

export default catalogSlice.reducer;
