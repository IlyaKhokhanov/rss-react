import { createSlice } from '@reduxjs/toolkit';

interface IState {
  countries: string[];
}

const initialState: IState = {
  countries: ['Russia', 'England'],
};

const catalogSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setState(state, action) {
      state.countries = [...state.countries, action.payload];
    },
  },
});

export const { setState } = catalogSlice.actions;

export default catalogSlice.reducer;
