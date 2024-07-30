'use client';

import { useEffect } from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import List from '../../../components/List/List';
import Loader from '../../../components/Loader/Loader';
import Pagination from '../../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { requestAPI } from '../../../redux/requestService';
import {
  setCountElements,
  setCurrentElement,
  setCurrentPage,
  setError,
  setList,
  setLoading,
} from '../../../redux/slices/application';
import { useParams } from 'next/navigation';

function Page({ children }: Readonly<{ children?: React.ReactNode }>) {
  const params = useParams<{ page: string; id?: string }>();
  const dispatch = useAppDispatch();
  const { currentPage, searchString, isLoading } = useAppSelector(
    (state) => state.application,
  );

  const queryList = requestAPI.useFetchAllItemsQuery({
    search: searchString,
    page: currentPage || 1,
  });

  useEffect(() => {
    dispatch(setCurrentPage(params.page ? +params.page : 1));
    dispatch(setCurrentElement(params.id ? params.id : null));
  }, [params, dispatch]);

  useEffect(() => {
    dispatch(setLoading(queryList.isLoading || queryList.isFetching));
    if (queryList.data) {
      dispatch(setList(queryList.data.results));
      dispatch(setCountElements(queryList.data.count));
    } else if (queryList.error) dispatch(setError(true));
  }, [
    queryList.data,
    queryList.isFetching,
    queryList.isLoading,
    queryList.error,
    dispatch,
  ]);

  return (
    <MainLayout>
      <div className="block-left">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <List />
            <Pagination />
          </>
        )}
      </div>
      {children && children}
    </MainLayout>
  );
}

export default Page;
