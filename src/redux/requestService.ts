import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRequestList, requestObj } from '../types';

interface IFetchAllArgs {
  search: string;
  page: number;
}

export const requestAPI = createApi({
  reducerPath: 'requestAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people' }),
  endpoints: (builder) => ({
    fetchAllItems: builder.query<IRequestList, IFetchAllArgs>({
      query: ({ search, page }) => ({
        url: '',
        params: { page, search },
      }),
    }),
    fetchOneItem: builder.query<requestObj, string>({
      query: (id) => ({ url: id }),
    }),
  }),
});
