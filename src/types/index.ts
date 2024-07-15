import { ReactNode } from 'react';

type requestObj = {
  birth_year: string;
  created: Date;
  edited: Date;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};

interface IState {
  currentPage: number | null;
  searchString: string;
  list: requestObj[];
  isLoading: boolean;
  countElements: number;
  itemsPerPage: number;
  currentElement: string;
  hasError: boolean;
  isDarkTheme: boolean;
}

interface IRequestList {
  results: requestObj[];
  count: number;
}

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ISelectedItem {
  name: string;
  url: string;
  id: string;
}

export {
  type requestObj,
  type IRequestList,
  type IState,
  type ErrorBoundaryProps,
  type ErrorBoundaryState,
  type ISelectedItem,
};
