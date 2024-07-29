import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../types';

const initialState: IState = {
  currentPage: null,
  searchString: localStorage.getItem('searchString') || '',
  list: [],
  isLoading: true,
  countElements: 0,
  itemsPerPage: 10,
  currentElement: '',
  hasError: false,
};

const catalogSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setSearchString(state, action) {
      localStorage.setItem('searchString', action.payload);
      state.searchString = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setCurrentElement(state, action) {
      state.currentElement = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCountElements(state, action) {
      state.countElements = action.payload;
    },
    setList(state, action) {
      state.list = action.payload;
    },
    setError(state, action) {
      state.hasError = action.payload;
    },
  },
});

export const {
  setSearchString,
  setCurrentPage,
  setCurrentElement,
  setCountElements,
  setLoading,
  setList,
  setError,
} = catalogSlice.actions;

export default catalogSlice.reducer;
