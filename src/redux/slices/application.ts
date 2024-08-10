import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../types';

const initialState: IState = {
  hasError: false,
  isDarkTheme: false,
};

const catalogSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setError(state, action) {
      state.hasError = action.payload;
    },
    setDarkTheme(state, action) {
      state.isDarkTheme = action.payload;
    },
  },
});

export const { setError, setDarkTheme } = catalogSlice.actions;

export default catalogSlice.reducer;
