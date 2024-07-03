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

interface IRequest {
  results: requestObj[];
}

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

interface ErrorBoundaryState {
  hasError: boolean;
}

export {
  type IRequest,
  type requestObj,
  type ErrorBoundaryProps,
  type ErrorBoundaryState,
};
